import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './containers/App';
import {applyMiddleware, createStore} from "redux";
import rootReducer from './reducers/index'
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import logger from "./middleware/logger";
import {composeWithDevTools} from "redux-devtools-extension";
import {handleGetAuthedUser} from "./actions/authUser";
import {openDB} from "idb";

const composeEnhancers = composeWithDevTools({
    name: "My nanodegree project",
    actionCreators: handleGetAuthedUser,
    trace: true,
    traceLimit: 23
});
// more details about possible options are here: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

const base = document.querySelector('base');
let baseUrl = base && base.href || '';
if (!baseUrl.endsWith('/')) {
    baseUrl = `${baseUrl}/`;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${baseUrl}sw.js`)
        .then( registration => {
            // Registration was successful
            debugger;
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
            // registration failed :(
            debugger;
            console.log('ServiceWorker registration failed: ', err);
        });
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);