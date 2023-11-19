import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {
    accounts: [],
    email: null,
    businesses: [],
    roles: [],
    uuid: null,
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount(state, action) {
      state.current = action.payload;
    },
    reset(state) {
      state.current = {
        ...initialState.current,
      };
    },
  },
});

const { actions, reducer } = accountSlice;

export { actions as AccountActions, reducer as default };
