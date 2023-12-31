import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import userReducer from './slices/user';
import tipReducer from './slices/tip';
import transactionReducer from './slices/transaction';
import themeReducer from './slices/theme';
import {clearStore} from './util';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  // whitelist: [],
};

const tipPersistConfig = {
  key: 'tip',
  storage,
  keyPrefix: 'redux-',
  // whitelist: [],
};

const transactionPersistConfig = {
  key: 'transaction',
  storage,
  keyPrefix: 'redux-',
  // whitelist: [],
};

const themePersistConfig = {
  key: 'theme',
  storage,
  keyPrefix: 'redux-',
  // whitelist: [],
};

const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  tip: tipReducer,
  transaction: persistReducer(transactionPersistConfig, transactionReducer),
  theme: themeReducer,
  // tip: persistReducer(tipPersistConfig, tipReducer),
  // theme: persistReducer(themePersistConfig, themeReducer),
});

const rootReducer = (state, action) => {
  // TODO: currently this doesn't clear with persist, only clears temporary
  if (action.type === clearStore.type) {
    storage.removeItem('persist:root');
    storage.removeItem('persist:user');
    storage.removeItem('persist:transaction');
    storage.removeItem('persist:tip');
    storage.removeItem('persist:theme');

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export {rootPersistConfig, rootReducer};
