import {render} from "react-dom";
import React,{Component} from "react";
import {Router, Route,browserHistory,IndexRoute} from "react-router";
import {Provider} from "react-redux";
import { store } from "./data/StoreConfig";
import AppCont from './containers/AppCont';

import "antd/dist/antd.css";
import './../base/styles/base.scss';
import "./styles/index.scss";

import fn from '../base/services/InitData';

fn().then(() => render(
    <Provider store={store}>
        <Router history={browserHistory} ignoreScrollBehavior>
        <Route path="/scm.html" >
            <IndexRoute component={AppCont} />
            <Route path={`/R/scm/index`} component={AppCont} />
        </Route>
        </Router>
    </Provider>,
    document.getElementById('bodycontext')
))
