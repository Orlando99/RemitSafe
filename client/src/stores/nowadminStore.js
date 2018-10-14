import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
import { parse } from 'path';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var adminActions = require('../actions/adminActions');
var Constants = require('../constants/constants');
var _ = require('underscore');


var _usersCount = 0;
var _orgsCount = 0;
function loadUserOrganizationCount(data) {
    localStorage.setItem('userorganizationcount', JSON.stringify(data));
}

var nowadminStore = _.extend({}, EventEmitter.prototype, {

    // Return Product data
    getOraganizationCount: function () {
        return JSON.parse(localStorage.getItem('userorganizationcount'))[1]["0"].organizations;
    },
    getUserCount: function () {
        return JSON.parse(localStorage.getItem('userorganizationcount'))[0]["0"].users;
    },
    getVerifiedOrg:function(){
      return JSON.parse(localStorage.getItem('userorganizationcount'))[2]["0"].verifiedorg;
    },
    getBuyerVendorLinks:function(){
        return JSON.parse(localStorage.getItem('userorganizationcount'))[3]["0"].buyervendorlink;
    },
    getPendingUser:function(){
        return JSON.parse(localStorage.getItem('userorganizationcount'))[4]["0"].pendingusers;
    },
    getPendingRemitApprove:function(){
        return JSON.parse(localStorage.getItem('userorganizationcount'))[5]["0"].pendingapprove;
    },
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
    getDashboardCountsCall: function (orgid) {
        axios.get(getAPIUrl() + 'getdashboardcounts').then((response) => {
            adminActions.receiveUserOrgCounts(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

        // Respond to RECEIVE_LOGIN_RES action
        case Constants.RECEIVE_USERS_ORGS_COUNTS_RES:
            loadUserOrganizationCount(action.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    nowadminStore.emitChange();

    return true;

});

export default nowadminStore;
