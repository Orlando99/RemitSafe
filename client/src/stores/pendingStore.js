import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events');
var pendingAcions = require('../actions/pendingActions');
var Constants = require('../constants/constants');
var _ = require('underscore');

let _pending = [];
let _searchresult = [];
function loadPending(data) {
    _pending = [];
    Object.keys(data[0]).map(function (key) {
        _pending.push(data[0][key]);
    });
    Object.keys(data[1]).map(function (key) {
        _pending.push(data[1][key]);
    })
}

var pendingStore = _.extend({}, EventEmitter.prototype, {


    //    Emit change Event
    emitChange: function () {
        this.emit('change');
    },

    //    Change Listeners
    addChangeListener: function (cb) {
        this.on('change', cb);
    },
    removeChangeListener: function (cb) {
        this.removeListener('change', cb)
    },

    getAllPendings: function () {
        return _pending;
    },

    //  Grab All Pending from Database
    //    Pending Organizations
    getAllPenndingVerification: function (fetch) {
        axios.post(getAPIUrl() + 'graballpending', {
            fetch
        }).then((response) => {
            pendingAcions.receiveAllPending(response.data);
        }).catch(error => {
            toastr.error(error);
        });
    },
    searchAllPending: function (search, callback) {
        axios.post(getAPIUrl() + 'searchpending', {
            search: search
        }).then((response) => {
            _searchresult = [];
            let data = response.data;
            Object.keys(data[0]).map(function (key) {
                _searchresult.push(data[0][key]);
            });
            Object.keys(data[1]).map(function (key, index) {
                let isAdded = false;
                _searchresult.forEach((item) => {
                    if (item.id === data[1][key].id) {
                        isAdded = true;
                        return;
                    }
                })
                if (isAdded === false) {
                    _searchresult.push(data[1][key]);
                }
            })
            callback(_searchresult);
        }).catch(error => {
            toastr.error(error);
        });
    },
    loadPendingInformation: function (data, callback) {
        axios.post(getAPIUrl() + 'loadpendinginfo', {
            type: data.type,
            orgid: data.orgid
        }).then((response) => {
            _searchresult = [];
            let data = response.data;
            Object.keys(data[0]).map(function (key) {
                _searchresult.push(data[0][key]);
            });
            callback(_searchresult);
        }).catch(error => {
            toastr.error(error);
        });
    }
}); // Close pendingStore


//    Register with App Dispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case Constants.RECEIVE_ALL_PENDING:
            loadPending(action.data);
            break;
        default:
            return true;
    }
    pendingStore.emitChange();
    return true;
});



export default pendingStore;