import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Fragment>
      <Router>
        <App />
      </Router>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            border: "1px solid gray",
            padding: "16px",
            color: "white",
            background: "rgba(45, 48, 54)",
            opacity: "30",
          },
        }}
      />
    </Fragment>
  </Provider>
);
