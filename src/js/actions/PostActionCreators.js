import Constants from '../Constants';
import axios from 'axios';
import Dispatcher from '../Dispatcher';

let baseUrl = Constants.HACKER_NEWS_API;

export default {
    getPosts(limit) {
        axios.get(`${baseUrl}/getPosts?limit=` + limit).then(response => {
            Dispatcher.handleServerAction({
                type: Constants.ActionTypes.FETCHED_POSTS,
                data: response.data
            });
        });
    },

    submitPost(post) {
        axios.post(`${baseUrl}/post`, post).then(response => {
            Dispatcher.handleServerAction({
                type: 'ADDED_POST'
            });
        });
    },

    registerUser(user) {
        let payload = {user_name: user.username, user_pwd: user.password};
    	axios.post(`${baseUrl}/addUser`, payload).then(response => {
            Dispatcher.handleServerAction({
                type: 'ADDED_USER',
                data: response.data
            });
        });
    },

    logIn(user) {
        let payload = {user_name: user.username, user_pwd: user.password};
    	axios.post(`${baseUrl}/logIn`, payload).then(response => {
                console.log("logged in", response);
            Dispatcher.handleServerAction({
                type: 'LOGGED_IN',
                data: response.data
            });
        });
    },

    logOut() {
        console.log("action logout")
        Dispatcher.handleViewAction({
            type: 'LOGGED_OUT'
        });
    },

    updateUser(user) {
    	Dispatcher.handleViewAction({
            type: 'USER_MODIFIED',
            data: user
        });
    },

    updateNewUser(user) {
    	Dispatcher.handleViewAction({
            type: 'NEW_USER_MODIFIED',
            data: user
        });
    }
};
