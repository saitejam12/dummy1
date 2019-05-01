import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Charts from "./components/Charts";
import "./App.css";
export default () => (
  <Provider store={store}>
    <Charts />
  </Provider>
);
