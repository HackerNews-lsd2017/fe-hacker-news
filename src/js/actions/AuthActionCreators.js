import Constants from '../Constants';
import axios from 'axios';
import Dispatcher from '../Dispatcher';

let baseUrl = Constants.HACKER_NEWS_API;

export default {
    registerUser(user) {
        let payload = {user_name: user.username, user_pwd: user.password};
    	axios.post(`${baseUrl}/addUser`, payload).then(response => {
            Dispatcher.handleServerAction({
                type: 'ADDED_USER',
                data: response.data
            });
        }).then(() => {
                this.logIn(user);
            });
    },

    logIn(user) {
        let payload = {user_name: user.username, user_pwd: user.password};
    	axios.post(`${baseUrl}/logIn`, payload).then(response => {
            console.log("reponse", response);
            Dispatcher.handleServerAction({
                type: 'LOGGED_IN',
                data: response.data
            });
        });
    },

    logOut() {
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
    },

    checkAuth() {
        Dispatcher.handleViewAction({
            type: 'CHECK_AUTH'
        });
    }
};
