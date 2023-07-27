import { configureStore } from "@reduxjs/toolkit";
import configReducer from "@/domains/config/config.store";

const store = configureStore({
  reducer: {
    config: configReducer,
  },
});

export default store;
