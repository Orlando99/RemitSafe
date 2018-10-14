import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var remitActions = require('../actions/remitActions');
var Constants = require('../constants/constants');
var _ = require('underscore');

var _remitInfo = {};
function loadRemitInfo(data) {
    _remitInfo = data;
}

var remitStore = _.extend({}, EventEmitter.prototype, {
    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },
    getRemitInfo: function () {
        return _remitInfo;
    },
    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    addUpdateRemitInfo: function (data, callback) {
        axios.post(getAPIUrl() + 'addupdateremitbankinfo', {
            name: data.name,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zip: data.zip,
            orgid: data.orgid,
            bankname: data.bankname,
            accountnumber: data.accountnumber,
            routingnumber: data.routingnumber,
            companyname: data.companyname
        }).then((response) => {
            callback();
        }).catch(error => {
            toastr.error(error);
            callback();
        });
    },
    getRemitBankInfo: function (orgid, callback) {
        axios.post(getAPIUrl() + 'getremitbankinfo', {
            orgid: orgid
        }).then((response) => {
            if (response != null) {
                callback(response.data);
            }
            else {
                callback(null);
            }

        }).catch(error => {
            toastr.error(error);
            callback(null);
        });
    },
    getRemitBankInfoById: function (remitid, callback) {
        axios.post(getAPIUrl() + 'getRemitBankInfoById', {
            remitid: remitid
        }).then((response) => {
            if (response != null) {
                callback(response.data);
            }
            else {
                callback(null);
            }

        }).catch(error => {
            toastr.error(error);
            callback(null);
        });
    },
    getAllRemitBankInfo: function (orgid, callback) {
        axios.post(getAPIUrl() + 'getAllRemitBankInfo', {
            orgid: orgid
        }).then((response) => {
            if (response != null) {
                callback(response.data);
            }
            else {
                callback(null);
            }

        }).catch(error => {
            toastr.error(error);
            callback(null);
        });
    },
    getBankInfo: function (orgid, callback) {
        axios.post(getAPIUrl() + 'getbankinfo', {
            orgid: orgid
        }).then((response) => {
            if (response != null) {
                callback(response.data);
            }
            else {
                callback(null);
            }

        }).catch(error => {
            toastr.error(error);
            callback(null);
        });
    },
    addUpdateBankInfo: function (data, callback) {
        axios.post(getAPIUrl() + 'addupdatebankinfo', {
            name: data.name,
            companyname: data.companyname,
            accountnumber: data.accountnumber,
            routingnumber: data.routingnumber,
            orgid: data.orgid
        }).then((response) => {
            callback();
        }).catch(error => {
            toastr.error(error);
            callback();
        });
    },
    updateRemitInfos: function(data, callback) {
        axios.post(getAPIUrl() + 'updateRemitInfos', data).then((response) => {
            callback(response);
        }).catch(error => {
            toastr.error(error);
            callback();
        });
    },
    updateRemitInfosActive: function(orgid, remitid, callback) {
        axios.post(getAPIUrl() + 'updateRemitInfosActive', {orgid: orgid, remitid: remitid}).then((response) => {
            callback(response);
        }).catch(error => {
            toastr.error(error);
            callback();
        });
    },
    sendEmailToBuyers: function(orgid, curorgname, callback) {
        axios.post(getAPIUrl() + 'sendEmailToBuyers', {orgid: orgid, curorgname: curorgname}).then((response) => {
            callback(response);
        }).catch(error => {
            toastr.error(error);
            callback();
        });
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case Constants.RECEIVE_REMIT_INFO_RES:
            loadRemitInfo(action.data);
            break;
        default:
            return true;
    }
    // If action was responded to, emit change event
    remitStore.emitChange();

    return true;

});

export default remitStore;