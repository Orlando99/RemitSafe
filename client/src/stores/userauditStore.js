import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/constants');
var _ = require('underscore');

var userauditStore = _.extend({}, EventEmitter.prototype, {

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
    saveUserAudit: function (email, callback) {
        axios.post(getAPIUrl() + 'createuseraudit', {
            email: email,
            date: new Date(),
            islocked: 1
        }).then((response) => {
            callback(true);
        }).catch(function (error) {
            toastr.error(error);
            callback(false);
        });
    },
    updateUserAudit: function (email, id, callback) {
        axios.post(getAPIUrl() + 'updateuseraudit', {
            id: id,
            email: email,
            date: new Date(),
            islocked: 0
        }).then((response) => {
            callback(true);
        }).catch(function (error) {
            toastr.error(error);
            callback(false);
        });
    },
    getUserAudit: function (email, callback) {
        axios.post(getAPIUrl() + 'getuseraudit', {
            email: email
        }).then((response) => {
            callback(response.data);
        }).catch(function (error) {
            toastr.error(error);
            callback(null);
        });
    },
    deleteUserAudit: function (email, callback) {
        axios.post(getAPIUrl() + 'deleteaudit', {
            email: email
        }).then((response) => {
            callback(response.data);
        }).catch(function (error) {
            toastr.error(error);
            callback(null);
        });
    }


});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

        // Respond to RECEIVE_LOGIN_RES action
        case Constants.RECEIVE_LOGIN_RES:

            break;


        default:
            return true;
    }

    // If action was responded to, emit change event
    userauditStore.emitChange();

    return true;

});

export default userauditStore;
//module.exports = userauditStore;