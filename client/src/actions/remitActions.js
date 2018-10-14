var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var remitActions = {
  receiveRemitInfo: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_REMIT_INFO_RES,
      data: data
    })
  }
};
module.exports = remitActions;

