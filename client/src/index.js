import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import App from "./components/App";
import ReduxPromise from "redux-promise";
import "./styles/style.css";
// import registerServiceWorker from "./registerServiceWorker";

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk, ReduxPromise)
);





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
