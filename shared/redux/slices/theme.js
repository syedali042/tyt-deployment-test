import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  mode: 'light-mode',
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Set Active Type
    setThemeMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export default slice.reducer;

const actions = slice.actions;

export const setThemeMode =
  ({mode}) =>
  (dispatch) =>
    dispatch(actions.setThemeMode(mode));

// Get Theme Mode
export const getThemeMode = (state) => state.theme.mode;
