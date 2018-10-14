var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var buyerActions = {

  // Receive login response
  receiveVendors: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_VENDORS_RES,
      data: data
    })
  },
  receiveVBuyers: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_V_BUYERS_RES,
      data: data
    })
  },
  receiveRemitInfo: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_REMIT_INFO_RES,
      data: data
    })
  }
};
module.exports = buyerActions;
//export default buyerActions;
