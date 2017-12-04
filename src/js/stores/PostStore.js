import Dispatcher from '../Dispatcher';
import BaseStore from '../BaseStore';
import Constants from '../Constants';
import assign from 'object-assign';
import PostActions from '../actions/PostActionCreators';

let _posts = [];
let _comments = [];
let _comment = "";
let _post = {};

/* Private Functions */
function setPosts(data) {
    _posts = _posts.concat(data);
}

function setComments(comments) {
    _comments = comments;
}

function setPost(post) {
    console.log("setPost", post);
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
            case Constants.ActionTypes.ADDED_POST:
                if (action.data) {
                    setPosts(action.data);
                }
                break;
            case Constants.ActionTypes.ADDED_COMMENT:
                if (action.data) {
                    PostActions.getComments(_post.hanesst_id);
                }
                break;
            case Constants.ActionTypes.LOADED_COMMENTS:
                if (action.data) {
                    setComments(action.data.children);
                    setPost(action.data.story);
                }
                break;
            case Constants.ActionTypes.POST_SET:
                if (action.data) {
                    setPost(action.data);
                }
                break;
            case Constants.ActionTypes.COMMENT_UPDATED:
                updateComment(action.data);
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
