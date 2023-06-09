import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import axios from '../axios';
import {tokenVariable} from '@/shared/config';

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  currentUser: {
    id: '',
    firebaseId: '',
    username: '',
    email: '',
    photoURL: '',
    displayName: '',
    loginType: '',
  },
  token: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setCurrentUser(state, action) {
      state.currentUser = {
        ...action.payload,
      };
    },

    removeCurrentUser(state) {
      state.currentUser = {};
    },

    setUserToken(state, action) {
      state.token = action.payload;
    },

    removeUserToken(state) {
      state.token = '';
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;

export const checkUsernameAvailability =
  ({username, email, type}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const value = username || email;

      const response = await axios.post('/users/check-availability', {
        value,
        type,
      });

      if (response.data.statusCode === 200)
        dispatch(actions.setCurrentUser({id: '', username, email: ''}));
      else throw 'Username Not Available';

      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

export const createUser = (user) => async (dispatch) => {
  dispatch(actions.startLoading());
  try {
    const response = await axios.post('/users', user);
    dispatch(actions.setCurrentUser(response.data.body));
    dispatch(actions.stopLoading());
  } catch (error) {
    console.log(error);
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
    throw error;
  }
};

export const signInUser = (user) => async (dispatch) => {
  dispatch(actions.startLoading());
  try {
    const response = await axios.post(
      `/users/login`,
      {},
      {
        headers: {
          [tokenVariable]: user.accessToken,
        },
      }
    );
    dispatch(actions.setCurrentUser(response.data.body));
    dispatch(actions.stopLoading());
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
    throw error;
  }
};

// Selectors
export const getUserToken = (state) => state.user.token;

export const getCurrentUser = (state) => state.user.currentUser;

export const isLoading = (state) => state.user.isLoading;
