import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import axios from '../axios';
import {tokenVariable} from '@/shared/config';
import {auth as firebaseAuth} from '@/shared/firebase';
import {signOut} from 'firebase/auth';
import {decodeJwtToken} from '@/shared/utils/jwtUtils';

// ----------------------------------------------------------------------
const defaultState = {
  isLoading: false,
  error: null,
  usernameToRegister: '',
  isUsernameVerified: true,
  invitedUser: null,
  currentUser: null,
  token: null,
};

const slice = createSlice({
  name: 'user',
  initialState: defaultState,
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
      const {user, token} = action.payload;
      state.currentUser = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(token));
    },

    removeCurrentUser(state) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return defaultState;
    },

    setInvitedUser(state, action) {
      state.invitedUser = action.payload;
    },

    setUsernameToRegister(state, action) {
      state.usernameToRegister = action.payload;
    },

    setIsUsernameVerified(state, action) {
      state.isUsernameVerified = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
const actions = slice.actions;
export const userActions = slice.actions;

export const checkUsernameAvailability =
  ({username}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const value = username || email;

      const response = await axios.post('/users/check-availability', {
        value,
        type: 'username',
      });

      if (response.data.statusCode === 200) {
        dispatch(actions.setUsernameToRegister(username));
        dispatch(actions.setIsUsernameVerified(true));
      } else {
        dispatch(actions.setUsernameToRegister(''));
        dispatch(actions.setIsUsernameVerified(false));
      }

      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

export const createUser = (userToCreate) => async (dispatch) => {
  dispatch(actions.startLoading());
  try {
    const response = await axios.post('/users', userToCreate, {
      headers: {
        [tokenVariable]: userToCreate.accessToken,
      },
    });
    const user = response.data.body;
    const token = response.headers[tokenVariable];
    dispatch(actions.setCurrentUser({user, token}));
    dispatch(actions.stopLoading());
  } catch (error) {
    console.log(error);
    dispatch(actions.stopLoading());
    dispatch(actions.hasError(error));
    throw error;
  }
};

export const signInUser = (userToSignIn) => async (dispatch) => {
  dispatch(actions.startLoading());
  try {
    const response = await axios.post(
      `/users/login`,
      {},
      {
        headers: {
          [tokenVariable]: userToSignIn.accessToken,
        },
      }
    );

    const user = response.data.body;
    const token = response.headers[tokenVariable];
    dispatch(actions.setCurrentUser({user, token}));
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
        dispatch(actions.removeCurrentUser());
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

// Selectors
export const getUserToken = (state) => state.user.token;

export const getCurrentUser = (state) => state.user.currentUser;

export const isLoading = (state) => state.user.isLoading;

// Set Invited User
export const setInvitedUser =
  ({token}) =>
  (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const invitedUser = decodeJwtToken({token});
      dispatch(actions.setInvitedUser(invitedUser));
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
    }
  };

// Get Invited User
export const getInvitedUser = (state) => state.user.invitedUser;

// Update User
export const updateUser =
  ({userDataToUpdate}) =>
  async (dispatch) => {
    dispatch(actions.startLoading());
    try {
      const response = await axios.patch('/users', userDataToUpdate, {
        headers: {
          [tokenVariable]: userDataToUpdate.accessToken,
        },
      });

      const user = response.data.body;
      const token = response.headers[tokenVariable];
      dispatch(actions.setCurrentUser({user, token}));
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

// set user in state
export const setUserInStateFromLocalStorage = () => (dispatch) => {
  const user = localStorage.getItem('user');
  if (user) dispatch(actions.setCurrentUser(JSON.parse(user)));
};

// Get username to register
export const getUsernameToRegister = (state) => state.user.usernameToRegister;

// Set Is Username Verified;
export const setIsUsernameVerified = (isUsernameVerified) => (dispatch) =>
  dispatch(actions.setIsUsernameVerified(isUsernameVerified));

// Get Is Username Verified
export const getIsUsernameVerified = (state) => state.user.isUsernameVerified;
