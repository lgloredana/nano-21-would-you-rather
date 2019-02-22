import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './containers/App';
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from './reducers/index'
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import logger from "./middleware/logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose(); //&&
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk, logger)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);