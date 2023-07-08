const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "@/domains/auth/auth.store";
import configReducer from "@/domains/config/config.store";

const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
  },
});

export default store;
