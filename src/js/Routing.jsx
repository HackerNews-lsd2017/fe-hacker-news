/* eslint max-len:0*/
// Disable linter max length. Routing Table nesting makes difficult avoiding long lines
// and breaking entries into several lines doesn't help readability.

import React from 'react';
import ReactDOM from 'react-dom';
// import {Router} from 'react-router';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import App from './components/AppContainer';

const List = () => (
  <div>
    <h2>many items, craaaazy</h2>
    <ul>
        <li><Link to="/post/1">Post 1</Link></li>
    </ul>
  </div>
);

const PostDetails = ({match}) => (
  <div>
    Post {match.params.id}
  </div>
);


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

/* Application Routes for Web */
const AppRoutes = (
    <BrowserRouter>
        <App>
            <Route exact path="/" component={List}/>

            <Route path="/post/:postId" component={PostDetails}/>
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
