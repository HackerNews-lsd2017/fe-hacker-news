import React from 'react';
import {Route, Switch} from 'react-router';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import AppContainer from './components/AppContainer';
import Content from './components/Content';
import Login from './components/Login';
import Submit from './components/Submit';
import UserManagement from './components/UserManagement';
import CommentContainer from './components/CommentContainer';
import CommentReply from './components/CommentReply';

/* Application Routes for Web */
const AppRoutes = (
    <BrowserRouter>
        <App>
            <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/submit" component={Submit}/>
                <AppContainer>
                    <Route exact path="/" component={Content}/>
                    <Route path="/user" component={UserManagement}/>
                    <Route path="/item" component={CommentContainer}/>
                    <Route path="/reply" component={CommentReply}/>
                </AppContainer>
            </Switch>
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
