import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isExpired: false,
  isLoading: false,
  currentUser: null,
  tokens: {
    access: "",
    refresh: "",
    turnstile: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setTurnstileToken: (state, action) => {
      state.tokens.turnstileToken = action.payload;
    },
    setAccessToken: (state, action) => {
      state.tokens.accessToken = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setIsExpired: (state, action) => {
      state.isExpired = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.tokens.accessToken = "";
    },
  },
});

const { actions, reducer } = authSlice;

export { actions as AuthActions, reducer as default };
