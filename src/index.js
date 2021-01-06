import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";
import reducer from "./redux/reducers";
import { Provider } from "react-redux";
import App from "./App";
import "./firebase";

const middlewares = [promiseMiddleware, thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
