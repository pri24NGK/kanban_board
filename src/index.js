import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import swDevelop from "./swDevelop";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BoardReducer } from "./store/Reducers/BoardReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const RootReducers = combineReducers({
  Board: BoardReducer,
});

const store = createStore(
  RootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
swDevelop();
