import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
import logStore from './logStore';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var oraganizationActions = require('../actions/oraganizationActions');
var Constants = require('../constants/constants');
var _ = require('underscore');

let _allOrgs = [];

function loadAllOrg(data) {
    _allOrgs = data;
}
function loadOrg(data) {
    localStorage.setItem('editOrg', JSON.stringify(data));
}
var oraganizationStore = _.extend({}, EventEmitter.prototype, {

    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    getAllOrgs: function () {
        return _allOrgs;
    },
    setCurrentOrgforView: function (data) {
        localStorage.setItem('currentOrg', JSON.stringify(data));
    },
    getCurrentOrgforView: function () {
        return JSON.parse(localStorage.getItem('currentOrg'));
    },
    getOraganizationForHeader: function () {
        return JSON.parse(localStorage.getItem('editOrg'));
    },
    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    getAllOrgsCall: function (fetch) {
        axios.post(getAPIUrl() + 'getallorgs', {
            fetch: fetch
        }).then((response) => {
            oraganizationActions.receiveAllOraganizations(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    searchOrgByName: function (name, callback) {
        axios.post(getAPIUrl() + 'searchorgbyname', {
            name: name
        }).then((response) => {
            callback(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    loadOraganization: function (orgid, callback) {
        axios.post(getAPIUrl() + 'getOrganization', {
            orgid: orgid
        }).then((response) => {
            if (typeof callback != 'undefined') {
                callback(response.data);
            }
            else {
                oraganizationActions.receiveOraganization(response.data[0]);
            }

        }).catch(error => {
            toastr.error(error);
        });
    },
    verifyOraganization: function (data, callback) {
        axios.post(getAPIUrl() + 'verifyorg', {
            orgid: data.orgid,
            isverified: data.isverified
        }).then((response) => {
            let message;
            if (data.isverified === 0)
                message = "un-varified";
            else
                message = "verified";


            toastr.success(`organization ${message}`);
            oraganizationStore.loadOraganization(data.orgid);
            let logdata = {
                action: 'Organization ' + message,
                detail: 'Organization ' + message + ' by the admin'
            }
            logStore.logEvents(logdata);
            callback(true);
        }).catch(error => {
            toastr.error(error);
            callback(false);
        });
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

        // Respond to RECEIVE_ALL_ORGNAIZATIONS_RES action
        case Constants.RECEIVE_ALL_ORGNAIZATIONS_RES:
            loadAllOrg(action.data);
            break;
        case Constants.RECEIVE_ORGNAIZATION_RES:
            loadOrg(action.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    oraganizationStore.emitChange();

    return true;

});

export default oraganizationStore;
