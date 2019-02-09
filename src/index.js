import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './containers/App';
import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers/index'
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import logger from "./middleware/logger";


const store = createStore(rootReducer,applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);