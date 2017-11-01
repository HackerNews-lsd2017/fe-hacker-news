import assign from 'object-assign';
import Constants from './Constants';
import {EventEmitter} from 'events';

export default assign({}, EventEmitter.prototype, {
    // Allow Controller-View to register itself with store
    addChangeListener(callback) {
        this.on(Constants.CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(Constants.CHANGE_EVENT, callback);
    },

    // triggers change listener above, firing controller-view callback
    emitChange(argument) {
        this.emit(Constants.CHANGE_EVENT, argument);
    },

    addEventListener(eventName, callback) {
        this.on(eventName, callback);
    },

    removeEventListener(eventName, callback) {
        this.removeListener(eventName, callback);
    }
});
