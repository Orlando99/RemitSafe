import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
import loginStore from './loginStore';
import adminStore from './adminStore';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var userActions = require('../actions/userActions');
var Constants = require('../constants/constants');
var _ = require('underscore');


var logStore = _.extend({}, EventEmitter.prototype, {

    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    logEvents: function (data) {
        let userdata = loginStore.getDbUser();
        let username = '', userid = '', orgname = '';
        if (typeof userdata != "undefined" && userdata != null) {
            username = userdata.firstName + ' ' + userdata.lastName;
            userid = userdata.id
        }
        if (typeof adminStore.getOraganization() != "undefined" &&  adminStore.getOraganization() != null) {
            orgname = adminStore.getOraganization().name;
        }
        axios.post(getAPIUrl() + 'logevents', {
            user: username,
            userid: userid,
            organization: orgname,
            action: data.action,
            detail: data.detail,
        }).then((response) => {

        }).catch(error => {
            toastr.error(error);
        });
    },

});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    /*switch (action.actionType) {

        // Respond to RECEIVE_ALL_USERS_RES action
        case Constants.RECEIVE_ALL_USERS_RES:
            loadAllUser(action.data);
            break;
        default:
            return true;
    }*/

    // If action was responded to, emit change event
    logStore.emitChange();

    return true;

});

export default logStore;
