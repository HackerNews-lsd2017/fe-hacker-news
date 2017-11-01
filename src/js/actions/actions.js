import Constants from '../Constants';
import axios from 'axios';
import Dispatcher from '../Dispatcher';

let baseUrl = Constants.baseUrl;

export default {
    getPosts(limit) {
        axios.get(`${baseUrl}/getPosts?limit=`+limit).then(response => {
            console.log("got posts", response);
            Dispatcher.handleServerAction({
                type: 'FETCHED_POSTS'
            });
        }).catch(error => {
            console.log("ERROR: get posts");
            Dispatcher.handleServerAction({
                type: 'ERROR_FETCHED_POSTS',
                error: error
            });
        });
    }
};
