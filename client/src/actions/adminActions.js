var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var adminActions = {

  // Receive login response
  receiveOraganization: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_ORGNAIZATION_RES,
      data: data
    })
  },
  receiveVendorCount:function(data){
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_VENDOR_COUNT_RES,
      data: data
    })
  },
  receiveBuyerCount:function(data){
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_BUYER_COUNT_RES,
      data: data
    })
  },
  receiveUserOrgCounts:function(data){
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_USERS_ORGS_COUNTS_RES,
      data: data
    })
  }
};
module.exports=adminActions;
//export default buyerActions;