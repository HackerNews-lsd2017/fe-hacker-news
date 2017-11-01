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

    registerUser(user) {
    	let payload = JSON.stringify(user)
    	axios.post(`${baseUrl}/addUser`, payload).then(response => {
            Dispatcher.handleServerAction({
                type: 'ADDED_USER',
                data: response.data
            });
        });
    },

    logIn(user) {
    	let payload = JSON.stringify(user)
    	axios.post(`${baseUrl}/logIn`, payload).then(response => {
            Dispatcher.handleServerAction({
                type: 'LOGGED_IN',
                data: response.data
            });
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
