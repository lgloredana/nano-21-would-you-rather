import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './containers/App';
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from './reducers/index'
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import logger from "./middleware/logger";
import {composeWithDevTools} from "redux-devtools-extension";
import {handleGetAuthedUser} from "./actions/authUser";

const composeEnhancers = composeWithDevTools({
    name: "My nanodegree project",
    actionCreators: handleGetAuthedUser,
    trace: true,
    traceLimit: 23
});
// more details about possible options are here: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk, logger)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);