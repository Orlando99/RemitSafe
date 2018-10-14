import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
import { parse } from 'path';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var adminActions = require('../actions/adminActions');
var Constants = require('../constants/constants');
var _ = require('underscore');


var _vendorCount = 0;
var _buyerCount = 0;
function loadOrganization(data) {
    localStorage.setItem('organization', JSON.stringify(data));
}
function loadVendorCount(data) {
    _vendorCount = data.Count;
}
function loadBuyerCount(data) {
    _buyerCount = data.Count;
}
var adminStore = _.extend({}, EventEmitter.prototype, {

    // Return Product data
    getOraganization: function () {

        return JSON.parse(localStorage.getItem('organization'));
    },
    getVendorCount: function () {
        return _vendorCount;
    },
    getBuyerCount: function () {
        return _buyerCount;
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
    loadOraganization: function (orgid) {
        axios.post(getAPIUrl() + 'getOrganization', {
            orgid: orgid
        }).then((response) => {
            adminActions.receiveOraganization(response.data[0]);
        }).catch(error => {
            toastr.error(error);
        });
    },
    saveOraganization: function (data, callback) {
        console.log('data===>', data)
        axios.post(getAPIUrl() + 'updateOraganization', data).then((response) => {
            console.log('response.data.data ==>', response.data.data);
            adminActions.receiveOraganization(response.data.data);
            callback(true);
        }).catch(error => {
            toastr.error(error);
            callback(false);
        });
    },
    getAllOrgs: function (orgid, filterid, callback) {
        axios.post(getAPIUrl() + 'allOrgs', {
            orgid: orgid,
            filterid: filterid
        }).then((response) => {
            callback(response.data)
        }).catch(error => {
            toastr.error(error);
            callback();
        })
    },
    getAllOrgsWithemail: function (orgid, callback) {
        axios.post(getAPIUrl() + 'allOrgsWithEmail', {
            orgid: orgid
        }).then((response) => {
            callback(response.data)
        }).catch(error => {
            toastr.error(error);
            callback();
        })
    },
    getOrganization: function (orgid, isBuyer, callback) {
        var userorgid = adminStore.getOraganization();
        axios.post(getAPIUrl() + 'getorganizationbyuserid', {
            orgid: orgid,
            userorgid: userorgid.id,
            isbuyer: isBuyer
        }).then((response) => {
            let result = [];
            if (_.isEmpty(response.data[0])) {
                result.push(response.data[1]["0"]);
            }
            else {
                result.push(response.data[0]["0"]);
            }
            callback(result);
        }).catch(error => {
            toastr.error(error);
            callback();
        })
    },
    getVendorCountCall: function (orgid) {
        axios.post(getAPIUrl() + 'getbuyerfromvendorcount', {
            orgid: orgid
        }).then((response) => {
            adminActions.receiveVendorCount(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    getBuyerCountCall: function (orgid) {
        axios.post(getAPIUrl() + 'getvendorfrombuyercount', {
            orgid: orgid
        }).then((response) => {
            adminActions.receiveBuyerCount(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    sendVerificationEmail: function (data, callback) {
        axios.post(getAPIUrl() + 'sendverificationemail', {
            id: data.id,
            email: data.email,
            companyname: data.companyname,
            isBuyer: data.isBuyer
        }).then((response) => {
            callback();
        }).catch(error => {
            toastr.error(error);
            callback();
        });
    },
    verifyAssociation: function (id, callback) {
        axios.post(getAPIUrl() + 'verifyassociation', {
            id: id
        }).then((response) => {
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

        // Respond to RECEIVE_LOGIN_RES action
        case Constants.RECEIVE_ORGNAIZATION_RES:
            loadOrganization(action.data);
            break;
        case Constants.RECEIVE_VENDOR_COUNT_RES:
            loadVendorCount(action.data);
            break;
        case Constants.RECEIVE_BUYER_COUNT_RES:
            loadBuyerCount(action.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    adminStore.emitChange();

    return true;

});

export default adminStore;
//module.exports = loginStore;