import Constants from '../Constants';
import axios from 'axios';
import Dispatcher from '../Dispatcher';

let baseUrl = Constants.HACKER_NEWS_API;

export default {
    getPosts(page, limit) {
        axios.get(`${baseUrl}/getPostsNewNew?page=` + page + `&limit=` + limit).then(response => {
            console.log(response.data);
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
            Dispatcher.handleServerAction({
                type: 'ADDED_POST'
            });
        });
    },

    getComments() {
        axios.get(`${baseUrl}/getComments?hanesst_id=` + 445).then(response => {
            Dispatcher.handleServerAction({
                type: 'LOADED_COMMENTS',
                data: response.data
            });
        });
    },

    setPost() {
        Dispatcher.handleViewAction({
            type: 'POST_SET'
        });
    },

    updateComment(data) {
        Dispatcher.handleViewAction({
            type: 'COMMENT_UPDATED',
            data: data
        });
    }
};
