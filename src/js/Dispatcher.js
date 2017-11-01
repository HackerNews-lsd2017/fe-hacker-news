import {Dispatcher} from 'flux';
import Constants from './Constants';
import assign from 'object-assign';

/**
 * Purpose: to create a single dispatcher instance for use throughout the
 * entire app. The two methods below are merely thin wrappers that describe
 * where the action originated from. Not mandatory, but may be helpful
 **/
export default assign(new Dispatcher(), {

    /**
     * This does nothing yet, but will come in handy if you need to respond
     * to server-originated events and treat them differently...
     **/
    handleServerAction(action) {
        let payload = {
            source: 'SERVER_ACTION',
            action: action
        };

        if (this._isDispatching) {
            return this._deferredDispatch(payload);
        }

        this.dispatch(payload);
    },

    /**
     * Very thin wrapper around the core dispatcher API, just to signify
     * that actions triggered here originated on the client-side
     **/
    handleViewAction(action) {
        let payload = {
            source: 'VIEW_ACTION',
            action: action
        };

        if (this._isDispatching) {
            return this._deferredDispatch(payload);
        }

        this.dispatch(payload);
    },

    _deferredDispatch(payload) {
        setTimeout(() => {
            this.dispatch(payload)
        }, 0);
    }
});
