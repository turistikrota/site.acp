import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./i18n";
import "./assets/scss/theme.scss";
import App from "./App";
import store from "./stores";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
