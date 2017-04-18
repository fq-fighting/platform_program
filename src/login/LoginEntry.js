import {render} from "react-dom";
import React,{Component} from "react";
import {applyMiddleware,createStore} from 'redux';
import {Router, Route,browserHistory,IndexRoute} from "react-router";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import AppCont from './containers/AppCont';
import AccountResetCont from './containers/AccountResetCont';

import "antd/dist/antd.css";
import './../base/styles/base.scss'
import "./styles/main.scss";

import {prefix_route} from '../base/consts/UrlsConfig'

const store = createStore(rootReducer,applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Router history={browserHistory} ignoreScrollBehavior>
            <Route path={`${prefix_route}/login.html`}  component={AccountResetCont} >
            </Route>
        </Router>
    </Provider>,
    document.getElementById('bodycontext')
)