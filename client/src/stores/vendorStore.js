import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
import CommonFunctions from '../CommonFunctions';
import logStore from './logStore';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var vendorActions = require('../actions/vendorActions');
var Constants = require('../constants/constants');
var _ = require('underscore');

var _vendors = [];
var _Bvendors = [];
function loadVendorsData(data) {
    _vendors = data;
}
function loadBuyerFromVendors(data) {
    _Bvendors = data;
}
var vendorStore = _.extend({}, EventEmitter.prototype, {

    // Return Product data
    getVendors: function () {
        return _vendors;
    },
    getBVendors: function () {
        return _Bvendors;
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
    assginVendor: function (userorgid, orgid, companyname, callback) {
        axios.post(getAPIUrl() + 'assginvendor', {
            userorgid: userorgid,
            orgid: orgid
        }).then((response) => {
            if (typeof response.data.info != "undefined") {
                toastr.info("Vendor already assgined");
                callback('');
            }
            else {
                toastr.success("Vendor assgined sucessfully");

                let logdata = {
                    action: 'Link Established',
                    detail: 'Company ' + CommonFunctions.getOrgName() + ' Request a Link to Company ' + companyname + ' as a Vendor'
                }
                logStore.logEvents(logdata);
                callback(response.data);
            }

        }).catch(error => {
            toastr.error(error);
            callback('');
        });
    },
    unassginVendorBuyer: function (orgid, companyname, callback) {
        axios.post(getAPIUrl() + 'unassginebuyervendor', {
            orgid: orgid
        }).then((response) => {
            let logdata = {
                action: 'Link Deleted',
                detail: 'Company ' + CommonFunctions.getOrgName() + ' Deleted a Link to Company ' + companyname + '.'
            }
            logStore.logEvents(logdata);
            callback();
        }).catch(error => {
            toastr.error(error);
            callback();
        });
    },
    searchVendorName: function (name, callback) {

        axios.post(getAPIUrl() + 'searchvendor', {
            name: name
        }).then((response) => {
            callback(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    addVendorRequest: function (data, callback) {
        axios.post(getAPIUrl() + 'sendvendreq', {
            companyname: data.companyName,
            contactname: data.contactName,
            phone: data.contactPhone,
            email: data.contactEmail,
            userid: data.userid,
            isbuyer: data.isbuyer,
            orgid: data.orgid,
            requester: data.requester
        }).then((response) => {

            callback();
        }).catch((error) => {
            toastr.error(error);
        });
    },
    loadVendorsFromBuyer: function (orgid) {
        axios.post(getAPIUrl() + 'getvendorfrombuyer', {
            orgid: orgid
        }).then((response) => {
            vendorActions.receiveBVendors(response.data);
        }).catch(error => {

        });

    },
    getVenBuyLinksByOrg: function (orgid, callback) {
        axios.post(getAPIUrl() + 'getbvlinkdetailsbyorg', {
            orgid
        }).then((response) => {
            let _result = [];
            let data = response.data;
            Object.keys(data[0]).map(function (key) {
                _result.push(data[0][key]);
            });
            Object.keys(data[1]).map(function (key) {
                _result.push(data[1][key]);
            });
            callback(_result);
        }).catch(error => {
            toastr.error(error);
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
        case Constants.RECEIVE_B_VRNDORS_RES:
            loadBuyerFromVendors(action.data);
            break;
        default:
            return true;
    }

    // If action was responded to, emit change event
    vendorStore.emitChange();

    return true;

});

export default vendorStore;
//module.exports = loginStore;