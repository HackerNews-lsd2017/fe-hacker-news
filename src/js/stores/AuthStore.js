import Dispatcher from '../Dispatcher';
import BaseStore from '../BaseStore';
import assign from 'object-assign';
import Constants from '../Constants';

let _authenticated = false;
let _user = {username: "", password: ""};
let _newUser = {username: "", password: ""};


function updateUser(data) {
    _user = assign(_user, data);
}

function updateNewUser(data) {
    _newUser = assign(_newUser, data);
}

function getLocalUser() {
    let localUser = JSON.parse(localStorage.getItem('user'));
    if(localUser) {
        _user = localUser;
        _authenticated = true;
    }
}

function logOut() {
    _user = {};
    _authenticated = false;
    localStorage.removeItem('user');
}

function setAuth(data) {
    if(data) {
        let user = {username: data.user_name};
        localStorage.setItem('user', JSON.stringify(user));
        _user = {username: data.user_name};
        _authenticated = true;
    }
}

const Store = assign({}, BaseStore, {

    getUser() {
        return _user;
    },

    getNewUser() {
        return _newUser;
    },

    getAuth() {
        return _authenticated;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
        let action = payload.action;
        switch (action.type) {
            case Constants.ActionTypes.ADDED_USER:
                if (action.data) {
                    // setPosts(action.data);
                    // setAuth(action.data);
                }
                break;
            case Constants.ActionTypes.USER_MODIFIED:
                if (action.data) {
                    updateUser(action.data);
                }
                break;
            case Constants.ActionTypes.NEW_USER_MODIFIED:
                if (action.data) {
                    updateNewUser(action.data);
                }
                break;
            case Constants.ActionTypes.LOGGED_IN:
                if (action.data) {
                    setAuth(action.data);
                }
                break;
            case Constants.ActionTypes.LOGGED_OUT:
                logOut();
                break;
            case Constants.ActionTypes.CHECK_AUTH:
                getLocalUser();
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
