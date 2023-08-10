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
      const transactions = action.payload;
      const transactionsSortedByDate = transactions.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      state.list = transactionsSortedByDate;

      const transactionEndDate = new Date(
        transactionsSortedByDate[transactionsSortedByDate.length - 1].date
      );

      const transactionStartDate = new Date(transactionEndDate);
      transactionStartDate.setFullYear(transactionEndDate.getFullYear() - 1);
      transactionStartDate.setDate(1);
      transactionStartDate.setMonth(transactionEndDate.getMonth() + 1);
      state.endDate = transactionEndDate;
      state.startDate = transactionStartDate;
    },
    prepareDashboardSummary(state, action) {
      const transactions = state.list;

      let uniqueTippers = [];

      let totalTippers = 0;

      let totalNumberOfTips = 0;

      let averageTipAmount = 0;

      let totalTipsAmount = 0;

      let totalRefundAmount = 0;

      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const {type, tipperId, amount} = transaction;

        if (type == 'tip') {
          if (tipperId && !uniqueTippers.includes(tipperId)) {
            uniqueTippers.push(tipperId);
          }
          totalTipsAmount += amount;
          totalNumberOfTips++;
        }

        if (type == 'refund') totalRefundAmount += amount;
      }

      totalTippers = uniqueTippers.length;
      totalTipsAmount = totalTipsAmount + totalRefundAmount;

      averageTipAmount = totalTipsAmount / totalNumberOfTips;

      state.summary = {
        totalTippers: parseInt(totalTippers),
        totalNumberOfTips: parseInt(totalNumberOfTips),
        totalTipsAmount: parseInt(totalTipsAmount),
        averageTipAmount: parseInt(averageTipAmount),
      };
    },
    resetTransactionsState(state, action) {
      state.list = [];
      state.startDate = null;
      state.endDate = null;
      state.summary = {};
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
  ({filterByActiveType, filterByStartDate, filterByEndDate}) =>
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
export const prepareDashboard = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const {currentUser, list} = state.user;
    if (currentUser?.role == 'user') await dispatch(fetchTransactions({}));
    else
      await dispatch(
        fetchTransactions({userPaymentIdFromAdmin: list[0]?.userPaymentId})
      );
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.setError(error));
  }
};

// Prepare User Transactions
export const fetchTransactions =
  ({userPaymentIdFromAdmin}) =>
  async (dispatch, getState) => {
    dispatch(actions.startLoading());
    dispatch(actions.resetTransactionsState());
    try {
      const state = getState();

      const {
        currentUser: {userPaymentId},
        token,
      } = state.user;

      // For Initial Request
      let startingAfter = null;
      // For Last Request Check
      let nextKey;

      let oldTransactionsList = state.transaction.list;
      while (nextKey !== null) {
        const response = await axios.get(
          `/transactions/${
            userPaymentIdFromAdmin || userPaymentId
          }/${startingAfter}`,
          {
            headers: {
              [tokenVariable]: token,
            },
          }
        );
        const {nextKey: nextRecordKey, list} = response.data.body;
        nextKey = nextRecordKey;
        startingAfter = nextRecordKey;
        dispatch(
          actions.setTransactionsList([...oldTransactionsList, ...list])
        );
      }

      // Prepare summary when after last request
      if (nextKey === null) dispatch(actions.prepareDashboardSummary());
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
      const state = getState();
      const transactionsState = state.transaction;
      const {list} = transactionsState;
      let transactionsList = list.map((transations) => transations);
      const {
        currentUser: {userPaymentId},
      } = state.user;
      const response = await axios.post('/payments/refund', {
        transactionId,
        userPaymentId,
      });
      const {transactions} = response.data.body;
      const tip = transactions[0];
      const refund = transactions[1];
      const foundIndex = transactionsList.findIndex(
        ({objId, tipperId}) => tipperId && objId == tip.objId
      );
      transactionsList[foundIndex] = tip;
      transactionsList.push(refund);
      dispatch(actions.setTransactionsList(transactionsList));
      dispatch(actions.prepareDashboardSummary());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.setError(error));
    }
  };
