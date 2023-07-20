import {createSlice} from '@reduxjs/toolkit';
import axios from '../axios';
import {createStepsSettings, validateEmail} from '@/shared/utils/tipUtils';
import {TIP_MESSAGES} from '@/shared/constants';

const initialState = {
  isLoading: false,
  error: null,
  teacher: null,
  teacherUsernameOrEmail: '',
  amount: 0,
  clientSecret: '',
  paymentIntentId: '',
  notes: '',
  stepsSettings: {
    activeStep: 'find-teacher-tab',
    completedSteps: ['find-teacher-tab'],
  },
  tipperEmail: '',
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
    },
    setClientSecret(state, action) {
      state.clientSecret = action.payload;
    },
    setPaymentIntentId(state, action) {
      state.paymentIntentId = action.payload;
    },
    setTipNotes(state, action) {
      state.notes = action.payload;
    },
    setStepsSettings(state, action) {
      state.stepsSettings = action.payload;
    },
    setTipState(state, action) {
      state = action.payload;
    },
    setTipperEmail(state, action) {
      state.tipperEmail = action.payload;
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
        dispatch(
          actions.setStepsSettings(createStepsSettings('selectAmountTab'))
        );
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
        } else {
          dispatch(
            actions.setCurrentTeacher({
              verified: false,
              [type]: teacherUsernameOrEmail,
            })
          );
          dispatch(
            actions.setStepsSettings(createStepsSettings('selectAmountTab'))
          );
          dispatch(actions.stopLoading());
        }
      });
  } catch (error) {
    dispatch(actions.setError(error));
    dispatch(actions.stopLoading());
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
export const initializeOrUpdateTipProcess =
  ({action}) =>
  async (dispatch, getState) => {
    dispatch(actions.startLoading());
    dispatch(actions.setError(null));
    try {
      const state = getState();
      let response;
      const {
        teacher: {stripeAccountId, email},
        amount,
        paymentIntentId: previousPaymentIntentId,
        tipperEmail,
        notes,
      } = state.tip;

      if (action !== 'noUpdate') {
        if (action == 'initializeCheckout') {
          dispatch(actions.setClientSecret(''));
          dispatch(actions.setPaymentIntentId(''));

          const body = stripeAccountId
            ? {stripeAccountId, amount}
            : {email, amount};

          response = await axios.post(
            `/payments/checkout-initialization`,
            body
          );
        } else if (action == 'updateAmountTipperEmailAndNotes') {
          const body = {amount, metadata: {email: tipperEmail, notes}};
          response = await axios.patch(
            `/payments/checkout-updation/${previousPaymentIntentId}`,
            body
          );
        }

        const {clientSecret, paymentIntentId} = response.data.body;

        dispatch(actions.setClientSecret(clientSecret));
        dispatch(actions.setPaymentIntentId(paymentIntentId));
      }
      dispatch(actions.setStepsSettings(createStepsSettings('checkoutTab')));
      dispatch(actions.stopLoading());
    } catch (error) {
      dispatch(actions.setError(error));
      dispatch(actions.stopLoading());
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

// Get Tip Notes
export const getTipNotes = (state) => state.tip.notes;

// Set Errors
export const setTipNotes =
  ({notes}) =>
  (dispatch) => {
    dispatch(actions.setTipNotes(notes));
  };

// Get Steps Settings
export const getStepsSettings = (state) => state.tip.stepsSettings;

// Set Steps Settings
export const setStepsSettings = (step) => (dispatch) => {
  const settings = createStepsSettings(step);
  dispatch(actions.setStepsSettings(settings));
};

export const resetTipState = () => (dispatch) =>
  dispatch(actions.setTipState(initialState));

// Get Steps Settings
export const getTipperEmail = (state) => state.tip.tipperEmail;

// Set Steps Settings
export const setTipperEmail = (email) => (dispatch) => {
  dispatch(actions.setTipperEmail(email));
};
