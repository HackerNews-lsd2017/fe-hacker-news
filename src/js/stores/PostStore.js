import Dispatcher from '../Dispatcher';
import BaseStore from '../BaseStore';
import Constants from '../Constants';
import assign from 'object-assign';

let _posts = [];
let _user = {username: "", password: ""};
let _newUser = {username: "", password: ""};

/* Private Functions */
function setPosts(data) {
    _posts = data;
}

function setUser(user) {
    _user = user;
}

function updateUser(data) {
    _user = assign(_user, data);
}

function updateNewUser(data) {
    _newUser = assign(_newUser, data);
}

/* Flux Store Creation */
const Store = assign({}, BaseStore, {
    getPosts() {
        return _posts;
    },

    getUser() {
        return _user;
    },

    getNewUser() {
        return _newUser;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
        let action = payload.action;
        switch (action.type) {
            case Constants.ActionTypes.FETCHED_POSTS:
                if (action.data) {
                    setPosts(action.data);
                }
                break;
            case 'ADDED_USER':
                if (action.data) {
                    setPosts(action.data);
                }
                break;
            case 'USER_MODIFIED':
                if (action.data) {
                    updateUser(action.data);
                }
                break;
            case 'NEW_USER_MODIFIED':
                if (action.data) {
                    updateNewUser(action.data);
                }
                break;
            default:
                return;
        }
        // If action was responded to, emit change event
        Store.emitChange();
        return;
    })
});

export default Store;