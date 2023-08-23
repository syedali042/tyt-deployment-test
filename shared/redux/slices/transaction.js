import {createSlice} from '@reduxjs/toolkit';
import {TRANSACTION_TYPES} from '@/shared/constants';
import axios from '../axios';
import {tokenVariable} from '@/shared/config';

const initialState = {
  isLoading: false,
  error: null,
  list: [],
  activeType: TRANSACTION_TYPES.all.value,
  startDate: null,
  endDate: null,
  summary: {
    totalTippers: null,
    totalTipsAmount: null,
    totalNumberOfTips: null,
    averageTipAmount: null,
  },
  viewUser: null,
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // Start Loading
    startLoading(state) {
      state.isLoading = true;
    },
    // Stop Loading
    stopLoading(state) {
      state.isLoading = false;
    },
    // Set Error
    setError(state, action) {
      state.error = action.payload;
    },
    // Set Active Type
    setActiveType(state, action) {
      state.activeType = action.payload;
    },
    // Set Start Date
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    // Set End Date
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    // Set Transactions List
    setTransactionsList(state, action) {
      const oldTransactions = state.list;
      const newList = [...oldTransactions, ...action.payload];
      const uniqueList = [
        ...new Map(
          newList.map((transaction) => [transaction['id'], transaction])
        ).values(),
      ];
      const transactionsSortedByDate = uniqueList
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      state.list = transactionsSortedByDate;
    },
    // Calculate Transactions Dates For Graph
    calculateTransactionsDatesForGraph(state, action) {
      const list = state.list;
      const transactionEndDate = new Date(list[list.length - 1]?.date);
      transactionEndDate.setDate(0);
      transactionEndDate.setMonth(transactionEndDate.getMonth() + 1);
      const transactionStartDate = new Date(transactionEndDate);
      transactionStartDate.setFullYear(transactionEndDate.getFullYear() - 1);
      transactionStartDate.setDate(1);
      transactionStartDate.setMonth(transactionEndDate.getMonth() + 1);
      state.endDate = transactionEndDate;
      state.startDate = transactionStartDate;
    },
    // Prepare Transactions Summary
    prepareTransactionsSummary(state, action) {
      const transactions = state.list;

      let uniqueTippers = [];

      let totalTippers = 0;

      let totalNumberOfTips = 0;

      let averageTipAmount = 0;

      let totalTipsAmount = 0;

      let totalRefundAmount = 0;

      for (let transaction of transactions) {
        const {type, tipperId, amount} = transaction;

        if (type == 'tip') {
          if (tipperId && !uniqueTippers.includes(tipperId)) {
            uniqueTippers.push(tipperId);
          }
          totalTipsAmount += amount;
          totalNumberOfTips++;
        }

        if (type == 'refund') {
          totalRefundAmount += amount;
          totalNumberOfTips -= 1;
        }
      }

      totalTippers = uniqueTippers.length;
      totalTipsAmount = totalTipsAmount + totalRefundAmount;

      averageTipAmount = totalTipsAmount / totalNumberOfTips;

      state.summary = {
        totalTippers: parseInt(totalTippers) || 0,
        totalNumberOfTips: parseInt(totalNumberOfTips) || 0,
        totalTipsAmount: parseInt(totalTipsAmount) || 0,
        averageTipAmount: parseInt(averageTipAmount) || 0,
      };
    },
    // Reset Transactions State
    resetTransactionsState(state, action) {
      state.list = [];
      state.startDate = null;
      state.endDate = null;
      state.summary = {};
      state.viewUser = null;
    },
    // Update transactions list
    updateTransactionsList(state, action) {
      let list = state.list;
      const {transactions} = action.payload;
      for (let transaction of transactions) {
        const foundIndex = list.findIndex(
          ({objId, type}) =>
            type == TRANSACTION_TYPES.tip.value && objId == transaction.objId
        );
        if (foundIndex !== -1) list[foundIndex] = transaction;
        else list.push(transaction);
      }
      state.list = list;
    },
    // Set Active View User
    setViewUser(state, action) {
      state.viewUser = action.payload;
    },
  },
});

export default slice.reducer;

const actions = slice.actions;

// Set Active Type
export const setActiveType = (activeType) => (dispatch) =>
  dispatch(actions.setActiveType(activeType));

// Get Active Type
export const getActiveType = (state) => state.transaction.activeType;

// Get Transactions
export const getTransactions =
  ({filterByActiveType, filterByStartDate, filterByEndDate, filterByGroupId}) =>
  (state) => {
    const transactionsState = state.transaction;
    let transactions = transactionsState.list;
    const {activeType, startDate, endDate} = transactionsState;
    if (filterByActiveType) {
      if (activeType != TRANSACTION_TYPES.all.value)
        transactions = transactions.filter(({type}) => type == activeType);
    }

    if (filterByStartDate) {
      transactions = transactions.filter(
        ({date}) => new Date(date) >= new Date(startDate)
      );
    }

    if (filterByEndDate) {
      transactions = transactions.filter(
        ({date}) => new Date(date) <= new Date(endDate)
      );
    }

    if (filterByGroupId) {
      transactions = transactions.filter(
        ({groupId}) => groupId == filterByGroupId
      );
    }
    return transactions;
  };

// Get Start Date
export const getStartDate = (state) => state.transaction.startDate;

// Get End Date
export const getEndDate = (state) => state.transaction.endDate;

// Set Start Date
export const setStartDate =
  ({date}) =>
  (dispatch) =>
    dispatch(actions.setStartDate(date));

// Set End Date
export const setEndDate =
  ({date}) =>
  (dispatch) =>
    dispatch(actions.setEndDate(date));

// Prepare Dashboard
export const initializeTransactions = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const {currentUser, list} = state.user;
    if (currentUser?.role == 'user') await dispatch(fetchTransactions({}));
    else await dispatch(fetchTransactions({user: list[0]}));
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.setError(error));
  }
};

// Prepare User Transactions
export const fetchTransactions =
  ({user}) =>
  async (dispatch, getState) => {
    dispatch(actions.startLoading());
    // Reseting the state for admin when he switch the preview user
    dispatch(actions.resetTransactionsState());
    try {
      if (user) dispatch(actions.setViewUser(user));

      const state = getState();
      const {
        currentUser: {userPaymentId},
        token,
      } = state.user;

      const paymentId = user ? user?.userPaymentId : userPaymentId;

      // For Initial Request
      let startingAfter = null;
      let nextKey;
      while (nextKey !== null) {
        const response = await axios.get(
          `/transactions/${paymentId}/${startingAfter}`,
          {
            headers: {
              [tokenVariable]: token,
            },
          }
        );
        const {nextKey: nextRecordKey, list} = response.data.body;
        nextKey = nextRecordKey;
        startingAfter = nextRecordKey;
        await dispatch(actions.setTransactionsList(list));
      }
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.setError(error));
    }
  };

// Get Transactions Summary
export const getTransactionsSummary = (state) => state.transaction.summary;

// Create Refund
export const createRefund =
  ({transactionId}) =>
  async (dispatch, getState) => {
    try {
      dispatch(actions.startLoading());
      const state = getState();
      const {token} = state.user;
      const {userPaymentId} = state.transaction.viewUser;
      const response = await axios.post(
        '/payments/refund',
        {
          transactionId,
          userPaymentId,
        },
        {
          headers: {
            [tokenVariable]: token,
          },
        }
      );
      dispatch(actions.updateTransactionsList(response.data.body));
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.setError(error));
    }
  };

// Get, Is Transactions Request Loading?
export const getIsTransactionsRequestLoading = (state) =>
  state.transaction.isLoading;

// Prepare Transactions Summary
export const prepareTransactionsSummary = () => (dispatch) =>
  dispatch(actions.prepareTransactionsSummary());

// Calculate Transactions Dates For Graph
export const calculateTransactionsDatesForGraph = () => (dispatch) =>
  dispatch(actions.calculateTransactionsDatesForGraph());

// Get View User
export const getViewUser = (state) => state.transaction.viewUser;
