var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var pendingActions = {

    receiveAllPending: function (data) {
        AppDispatcher.handleAction({
            actionType: Constants.RECEIVE_ALL_PENDING,
            data
        })
    }
};

module.exports = pendingActions;


