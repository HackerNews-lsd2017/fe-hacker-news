import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';
import AppContainer from './components/AppContainer';
import Login from './components/Login';
import Submit from './components/Submit';

/* Application Routes for Web */
const AppRoutes = (
    <BrowserRouter>
        <App>
            <Route exact path="/" component={AppContainer}/>
            <Route path="/login" component={Login}/>
            <Route path="/submit" component={Submit}/>
        </App>
    </BrowserRouter>
);


function init(targetId) {
    let target = document.getElementById(targetId);

    ReactDOM.render(AppRoutes, target);
}

export default {
    init
};
