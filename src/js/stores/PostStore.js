import Dispatcher from '../Dispatcher';
import BaseStore from '../BaseStore';
import Constants from '../Constants';
import assign from 'object-assign';
import PostActions from '../actions/PostActionCreators';

let _posts = [];
let _comments = [];
let _comment = "";
let _post = {};
let _karma = {};

/* Private Functions */
function setPosts(data) {
    _posts = _posts.concat(data);
}

function setComments(comments) {
    _comments = comments;
}

function setPost(post) {
    _post = post;
}

function updateComment(comment) {
    _comment = comment;
}

function duplicateId(posts, hanesst_id) {
    if (posts[hanesst_id]) {
        delete posts[hanesst_id];
        return true;
    }
    return false;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function handlePostUpvote(hanesst_id) {
    let karmaHistory = getKarma();
    if (!isEmpty(karmaHistory)) {
        let posts = karmaHistory.posts;
        if(!duplicateId(posts, hanesst_id)) {
            posts[hanesst_id] = 1;
            setLocalKarma(posts);
            return;
        }
        setLocalKarma(posts);
        return;
    }
    karmaHistory[hanesst_id] = 1;
    setLocalKarma(karmaHistory);
}

function setLocalKarma(data) {
    if(data) {
        let karma = {posts: data};
        localStorage.setItem('karma', JSON.stringify(karma));
        setKarma(karma);
        return;
    }
    localStorage.setItem('karma', JSON.stringify({posts: {}}));
}

function getKarma() {
    let karmaHistory = JSON.parse(localStorage.getItem('karma'));

    if (karmaHistory) {
        return karmaHistory;
    }

    return {};
}

function setKarma(karma = getKarma()) {
    _karma = karma;
}

/* Flux Store Creation */
const Store = assign({}, BaseStore, {
    getPosts() {
        return _posts;
    },

    getPostsKarma() {
        return _karma;
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
            case Constants.ActionTypes.UPVOTED_POST:
                handlePostUpvote(action.data);
                break;
            case Constants.ActionTypes.FETCH_KARMA:
                setKarma();
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
