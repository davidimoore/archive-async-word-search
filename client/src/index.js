import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "reducers/index";
import 'assets/index.css';
import App from 'components/App';
import {logger} from 'middlewares/logger';

let store = createStore(
  rootReducer,
  applyMiddleware(
    logger,
    thunk
  )
);
console.log("PORT", process.env.PORT)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
