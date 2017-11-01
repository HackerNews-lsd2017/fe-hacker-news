import Constants from '../Constants';
import axios from 'axios';
import Dispatcher from '../Dispatcher';

let baseUrl = Constants.HACKER_NEWS_API;

export default {
    getPosts(limit) {
        axios.get(`${baseUrl}/getPosts?limit=` + limit).then(response => {
            console.log("got posts", response);
            Dispatcher.handleServerAction({
                type: Constants.ActionTypes.FETCHED_POSTS,
                data: response.data
            });
        });
    }
};
