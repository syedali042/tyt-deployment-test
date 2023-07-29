import {createSlice} from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import axios from '../axios';
import {tokenVariable} from '@/shared/config';
import {auth as firebaseAuth} from '@/shared/firebase';
import {signOut} from 'firebase/auth';
import {decodeJwtToken} from '@/shared/utils/jwtUtils';

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  error: null,
  invitedUser: null,
  currentUser: null,
  token: null,
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
      const {user, token, preventLocal} = action.payload;
      state.currentUser = user;
      state.token = token;
      if (!preventLocal) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
      }
    },

    removeCurrentUser(state) {
      state = initialState;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },

    setInvitedUser(state, action) {
      state.invitedUser = action.payload;
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

      const user = {username};

      if (response.data.statusCode === 200)
        dispatch(actions.setCurrentUser({user, preventLocal: true}));
      else throw 'Username Not Available';

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
