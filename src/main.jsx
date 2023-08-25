import "@turistikrota/ui/fonts/verdana.css";
import { setDefaultImageSrc } from "@turistikrota/ui/hooks/image";
import "boxicons/css/boxicons.min.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "sspin/dist/index.css";
import App from "./App";
import "./assets/scss/theme.scss";
import { Config } from "./config/config";
import "./i18n";
import store from "./stores";

setDefaultImageSrc(Config.cdn.notFound);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
