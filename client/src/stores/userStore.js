import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var userActions = require('../actions/userActions');
var Constants = require('../constants/constants');
var _ = require('underscore');

let _allUsers = [];
let _usersByOrg = [];
function loadAllUser(data) {
    _allUsers = data;
}
function loadUsersByOrg(data) {
    _usersByOrg = data;
}
var userStore = _.extend({}, EventEmitter.prototype, {

    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    getAllUsers: function () {
        return _allUsers;
    },
    getUsersByOrg:function(){
      return _usersByOrg;
    },
    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    getAllUsersCall: function (fetch) {
        axios.post(getAPIUrl() + 'fetchallusers', {
            fetch: fetch
        }).then((response) => {
            userActions.receiveAllUsers(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    searchUserByName: function (name, callback) {
        axios.post(getAPIUrl() + 'searchuserbyname', {
            name: name
        }).then((response) => {
            callback(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    loadUser: function (userid, callback) {
        axios.post(getAPIUrl() + 'loaduserbyid', {
            id: userid
        }).then((response) => {
            callback(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    loadUserByOrgId: function (orgid) {
        axios.post(getAPIUrl() + 'loaduserbyorgid', {
            id: orgid
        }).then((response) => {
            userActions.receiveUserByOrgId(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

        // Respond to RECEIVE_ALL_USERS_RES action
        case Constants.RECEIVE_ALL_USERS_RES:
            loadAllUser(action.data);
            break;
        case Constants.RECEIVE_USER_BY_ORGID_RES:
            loadUsersByOrg(action.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    userStore.emitChange();

    return true;

});

export default userStore;
