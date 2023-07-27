import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import axios from '../axios';
import {tokenVariable} from '@/shared/config';
import {auth as firebaseAuth} from '@/shared/firebase';
import {signOut} from 'firebase/auth';

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  currentUser: {
    userInternalId: '',
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
export const userActions = slice.actions;

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
        dispatch(
          actions.setCurrentUser({
            userInternalId: '',
            firebaseId: '',
            username,
            email: '',
            photoURL: '',
            displayName: '',
            loginType: '',
          })
        );
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
    const response = await axios.post('/users', user, {
      headers: {
        [tokenVariable]: user.accessToken,
      },
    });
    dispatch(actions.setCurrentUser(response.data.body));
    localStorage.setItem('user', JSON.stringify(response.data.body));
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
    localStorage.setItem('user', JSON.stringify(response.data.body));
    localStorage.setItem(
      [tokenVariable],
      JSON.stringify(response.headers[tokenVariable])
    );
    dispatch(actions.stopLoading());
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
    throw error;
  }
};

export const signOutUser = () => async (dispatch) => {
  dispatch(actions.startLoading());
  try {
    await signOut(firebaseAuth)
      .then(() => {
        dispatch(
          actions.setCurrentUser({
            userInternalId: '',
            firebaseId: '',
            username: '',
            email: '',
            photoURL: '',
            displayName: '',
            loginType: '',
          })
        );
        localStorage.removeItem('user');
      })
      .catch((error) => {
        dispatch(actions.hasError(error));
      });
    dispatch(actions.stopLoading());
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
    throw error;
  }
};

export const getVerificationURL = () => async (dispatch) => {
  dispatch(actions.startLoading());
  try {
    const response = await axios.get(`/users/get-verification-url`, {
      headers: {
        [tokenVariable]: JSON.parse(localStorage.getItem([tokenVariable])),
      },
    });
    const url = response.data.body.url;
    window.open(url);
    dispatch(actions.stopLoading());
  } catch (error) {
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
    throw error;
  }
};

export const updateUser =
  ({user}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const response = await axios.patch(`/users`, user, {
        headers: {
          [tokenVariable]: JSON.parse(localStorage.getItem('token')),
        },
      });
      dispatch(actions.setCurrentUser(response.data.body));
      localStorage.setItem('user', JSON.stringify(response.data.body));
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

// set user in state
export const setUserInStateFromLocalStorage = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) dispatch(actions.setCurrentUser(JSON.parse(user)));
};
