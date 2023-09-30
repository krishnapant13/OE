import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";

const root = document.getElementById("root"); // Get the root DOM element

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

reportWebVitals();
