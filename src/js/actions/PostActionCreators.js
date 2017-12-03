import Constants from '../Constants';
import axios from 'axios';
import Dispatcher from '../Dispatcher';

let baseUrl = Constants.HACKER_NEWS_API;

export default {
    getPosts(page, limit) {
        axios.get(`${baseUrl}/getPosts?page=` + page + `&limit=` + limit).then(response => {
            Dispatcher.handleServerAction({
                type: Constants.ActionTypes.FETCHED_POSTS,
                data: response.data
            });
        });
    },

    getPostsBySite(site) {
        axios.get(`${baseUrl}/from?site=` + site).then(response => {
            Dispatcher.handleServerAction({
                type: Constants.ActionTypes.FETCHED_POSTS,
                data: response.data
            });
        });
    },

    submitPost(post) {
        axios.post(`${baseUrl}/post`, post).then(response => {
            if(post.post_type === "comment") {
                Dispatcher.handleServerAction({
                    type: Constants.ActionTypes.ADDED_COMMENT
                });
                return;
            }
            Dispatcher.handleServerAction({
                type: Constants.ActionTypes.ADDED_POST
            });
        });
    },

    getComments(hanesst_id) {
        axios.get(`${baseUrl}/getComments?hanesst_id=` + hanesst_id).then(response => {
            Dispatcher.handleServerAction({
                type: Constants.ActionTypes.LOADED_COMMENTS,
                data: response.data
            });
        });
    },

    setPost(data) {
        Dispatcher.handleViewAction({
            type: Constants.ActionTypes.POST_SET,
            data: data
        });
    },

    updateComment(data) {
        Dispatcher.handleViewAction({
            type: Constants.ActionTypes.COMMENT_UPDATED,
            data: data
        });
    }
};
