import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locale: "tr",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export { actions as ConfigActions, reducer as default };
