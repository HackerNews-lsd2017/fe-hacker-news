import keyMirror from 'keymirror';

export default {
	// Deployed server
    HACKER_NEWS_API: 'http://46.101.28.25:8080',

    // Local server
    // HACKER_NEWS_API: 'http://localhost:8080',

    // Each time you add an action, add it here... They should be past-tense
    ActionTypes: keyMirror({
        FETCHED_POSTS: null
    }),

    POSTS_AMOUNT: 30
};
