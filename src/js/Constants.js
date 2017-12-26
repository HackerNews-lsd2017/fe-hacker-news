import keyMirror from 'keymirror';

export default {
	// Deployed server
    HACKER_NEWS_API: 'http://46.101.28.25:8080',

    // Local server
    // HACKER_NEWS_API: 'http://localhost:8080',

    // Each time you add an action, add it here... They should be past-tense
    ActionTypes: keyMirror({
        // Post
        FETCHED_POSTS: null,
        ADDED_POST: null,
        LOADED_COMMENTS: null,
        POST_SET: null,
        COMMENT_UPDATED: null,
        // Auth
        ADDED_USER: null,
        USER_MODIFIED: null,
        NEW_USER_MODIFIED: null,
        LOGGED_IN: null,
        LOGGED_OUT: null,
        CHECK_AUTH: null,
        UPVOTED_POST: null,
        FETCH_KARMA: null
    }),

    POSTS_AMOUNT: 30
};
