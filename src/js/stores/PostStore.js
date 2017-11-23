import Dispatcher from '../Dispatcher';
import BaseStore from '../BaseStore';
import Constants from '../Constants';
import assign from 'object-assign';

let _posts = [];
let _comments = [];
let _comment = "";
let _post = {};

/* Private Functions */
function setPosts(data) {
    _posts = data;
}

function setComments(comments) {
    console.log("comments", comments);
    _comments = comments;
}

function setPost(post) {
    console.log("post", post);
    _post = post;
}

function updateComment(comment) {
    _comment = comment;
}

/* Flux Store Creation */
const Store = assign({}, BaseStore, {
    getPosts() {
        return _posts;
    },

    getComments() {
        return _comments;
    },

    getComment() {
        return _comment;
    },

    getPost() {
        return _post;
    },

    dispatcherIndex: Dispatcher.register(function(payload) {
        let action = payload.action;
        switch (action.type) {
            case Constants.ActionTypes.FETCHED_POSTS:
                if (action.data) {
                    setPosts(action.data);
                }
                break;
            case 'ADDED_POST':
                if (action.data) {
                    setPosts(action.data);
                }
                break;
            case 'LOADED_COMMENTS':
                if (action.data) {
                    setPost(action.data.story);
                    setComments(action.data.children);
                }
                break;
            case 'POST_SET':
                if (action.data) {
                    setPost(action.data);
                }
                break;
            case 'COMMENT_UPDATED':
                if (action.data) {
                    updateComment(action.data);
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
