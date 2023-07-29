import { configureStore } from "@reduxjs/toolkit";
import configReducer from "@/domains/config/config.store";
import accountReducer from "@/domains/root/subdomains/account/store/account.store";

const store = configureStore({
  reducer: {
    config: configReducer,
    account: accountReducer,
  },
});

export default store;
