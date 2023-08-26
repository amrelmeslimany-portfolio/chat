import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      position="bottom-center"
      theme="colored"
      limit={6}
    />
  </Provider>
);
