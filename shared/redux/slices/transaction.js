import {createSlice} from '@reduxjs/toolkit';
import {TRANSACTION_TYPES} from '@/shared/constants';
// Dummy Data
import {TRANSACTIONS} from '@/shared/components/dashboard/table/data';

const initialState = {
  isLoading: false,
  error: null,
  list: TRANSACTIONS,
  activeType: TRANSACTION_TYPES.all.value,
  startDate: '2022-06-14',
  endDate: '2023-07-12',
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
      if (activeType == TRANSACTION_TYPES.all.value)
        transactions = transactions;
      else transactions = transactions.filter(({type}) => type == activeType);
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

    if (filterByStartDate && filterByEndDate) {
      transactions = transactions.filter(
        ({date}) =>
          new Date(date) >= new Date(startDate) &&
          new Date(date) <= new Date(endDate)
      );
    }

    return transactions;
  };

// Get Start Date
export const getStartDate = (state) => state.transaction.startDate;

// Get End Date
export const getEndDate = (state) => state.transaction.endDate;
