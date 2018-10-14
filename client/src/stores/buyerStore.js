import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
import CommonFunctions from '../CommonFunctions';
import logStore from './logStore';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var buyerActions = require('../actions/buyerActions');
var Constants = require('../constants/constants');
var _ = require('underscore');

var _vendors = [];
var _vbuyer = [];
var _remitInfo = {};
function loadVendorsData(data) {
    _vendors = data;
}
function loadvbuyers(data) {
    _vbuyer = data;
}
function loadremitInfo(data) {
    _remitInfo = data;
}
var buyerStore = _.extend({}, EventEmitter.prototype, {

    // Return Product data
    getVendors: function () {
        return _vendors;
    },
    getvBuyer: function () {
        return _vbuyer;
    },
    getRemitInfo: function () {
        return _remitInfo;
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
    assginBuyer: function (userorgid, orgid, companyname, callback) {
        axios.post(getAPIUrl() + 'assginbuyer', {
            userorgid: userorgid,
            orgid: orgid
        }).then((response) => {
            if (typeof response.data.info != "undefined") {
                toastr.info("Buyer already assgined");
                callback('');
            }
            else {
                toastr.success("Buyer assgined sucessfully");
                let logdata = {
                    action: 'Link Established',
                    detail: 'Company ' + CommonFunctions.getOrgName() + ' Request a Link to Company ' + companyname + ' as a Buyer'
                }
                logStore.logEvents(logdata);
                callback(response.data);
            }
        }).catch(error => {
            toastr.error(error);
            callback('');
        });
    },
    loadVendors: function (buyerid) {
        axios.post(getAPIUrl() + 'loadvendorbybuyer', {
            buyerid: buyerid
        }).then((response) => {
            buyerActions.receiveVendors(response.data);
        }).catch(error => {
            console.log(error);
            buyerActions.receiveVendors(_vendors);
        });
    },
    loadBuyerFromVendors: function (orgid) {
        axios.post(getAPIUrl() + 'getbuyerfromvendor', {
            orgid: orgid
        }).then((response) => {
            buyerActions.receiveVBuyers(response.data);
        }).catch(error => {
            toastr.error(error);
        });

    },
    viewRemitInfo: function (orgid, callback) {
        axios.post(getAPIUrl() + 'getremitandbankinfo', {
            orgid: orgid
        }).then((response) => {
            callback(response.data[0]);
        }).catch(error => {
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
        case Constants.RECEIVE_VENDORS_RES:
            loadVendorsData(action.data);
            break;
        case Constants.RECEIVE_V_BUYERS_RES:
            loadvbuyers(action.data);
            break;
        case Constants.RECEIVE_REMIT_INFO_RES:
            loadremitInfo(action.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    buyerStore.emitChange();

    return true;

});

export default buyerStore;
//module.exports = loginStore;