import {createSlice} from '@reduxjs/toolkit';
import axios from '../axios';
import {validateEmail} from '@/shared/utils/tipUtils';
import {TIP_MESSAGES} from '@/shared/constants';

const initialState = {
  isLoading: false,
  error: null,
  teacher: null,
  teacherUsernameOrEmail: null,
  amount: 0,
  clientSecret: '',
  paymentIntentId: '',
};

const slice = createSlice({
  name: 'tip',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentTeacher(state, action) {
      state.teacher = action.payload;
    },
    setTeacherUsernameOrEmail(state, action) {
      state.teacherUsernameOrEmail = action.payload
        .toLowerCase()
        .split(' ')
        .join('');
    },
    setTipAmount(state, action) {
      state.amount = action.payload;
      state.clientSecret = '';
    },
    setClientSecret(state, action) {
      state.clientSecret = action.payload;
    },

    setPaymentIntentId(state, action) {
      state.paymentIntentId = action.payload;
    },
  },
});

export default slice.reducer;
const actions = slice.actions;

// set teacher username or email to find and tip
export const setTeacherUsernameOrEmail =
  ({usernameOrEmail}) =>
  (dispatch) => {
    dispatch(actions.setTeacherUsernameOrEmail(usernameOrEmail));
  };

// get teacher username or email to find and tip
export const getTeacherUsernameOrEmail = (state) =>
  state.tip.teacherUsernameOrEmail;

// fetch teacher details by username or email to tip or set new user to invite & tip
export const verifyUserToTip = () => async (dispatch, getState) => {
  dispatch(actions.startLoading());
  dispatch(actions.setClientSecret(''));
  dispatch(actions.setPaymentIntentId(''));
  dispatch(actions.setError(null));
  try {
    const state = getState();
    const {teacherUsernameOrEmail} = state.tip;
    const type = validateEmail({email: teacherUsernameOrEmail})
      ? 'email'
      : 'username';
    await axios
      .get(`/users?${type}=${teacherUsernameOrEmail}`)
      .then((response) => {
        const {body} = response.data;
        dispatch(actions.setCurrentTeacher({...body}));
        dispatch(actions.stopLoading());
      })
      .catch((error) => {
        if (type == 'username') {
          dispatch(
            actions.setError({
              code: error.code,
              message: TIP_MESSAGES.nonExistedUsernameMessage(),
            })
          );
          dispatch(actions.stopLoading());
          throw error;
        } else {
          dispatch(
            actions.setCurrentTeacher({
              verified: false,
              [type]: teacherUsernameOrEmail,
            })
          );
          dispatch(actions.stopLoading());
        }
      });
  } catch (error) {
    dispatch(actions.stopLoading());
    throw error;
  }
};

// set tip amount
export const setTipAmount =
  ({amount}) =>
  (dispatch) => {
    dispatch(actions.setTipAmount(amount));
  };

// get tip amount
export const getTipAmount = (state) => state.tip.amount;

// Initialize Tip Process
export const initializeTipProcess = () => async (dispatch, getState) => {
  dispatch(actions.startLoading());
  dispatch(actions.setClientSecret(''));
  dispatch(actions.setPaymentIntentId(''));
  dispatch(actions.setError(null));
  try {
    const state = getState();
    const {
      amount,
      teacher: {stripeAccountId, email},
    } = state.tip;

    const body = stripeAccountId ? {stripeAccountId, amount} : {email, amount};

    const response = await axios.post(
      `/payments/checkout-initialization`,
      body
    );

    const {clientSecret, paymentIntentId} = response.data.body;

    dispatch(actions.setClientSecret(clientSecret));
    dispatch(actions.setPaymentIntentId(paymentIntentId));
    dispatch(actions.stopLoading());
  } catch (error) {
    dispatch(actions.setError(error));
    dispatch(actions.startLoading());
    throw error;
  }
};

// Update the existed payment intent if client secret is already there
export const updateCheckoutProcess =
  ({paymentIntentId, data}) =>
  async (dispatch, getState) => {
    dispatch(actions.startLoading());
    try {
      const response = await axios.patch(
        `/payments/checkout-updation/${paymentIntentId}`,
        data
      );
      const {clientSecret, paymentIntentId: intentId} = response.data.body;
      dispatch(actions.setClientSecret(clientSecret));
      dispatch(actions.setPaymentIntentId(intentId));
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.stopLoading());
      dispatch(actions.hasError(error));
      throw error;
    }
  };

// Get Client Secret
export const getClientSecret = (state) => state.tip.clientSecret;

// Get Payment Intent Id
export const getPaymentIntentId = (state) => state.tip.paymentIntentId;

// get is payment request is loading
export const getIsPaymentRequestLoading = (state) => state.tip.isLoading;

// Get Current Teacher
export const getCurrentTeacher = (state) => state.tip.teacher;

// Get Errors
export const getErrors = (state) => state.tip.error;

// Set Errors
export const setTipErrors =
  ({errors}) =>
  (dispatch) => {
    dispatch(actions.setError(errors));
  };
