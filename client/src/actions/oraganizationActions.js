var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var oraganizationActions = {

  // Receive All Orgs response
  receiveAllOraganizations: function(data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_ALL_ORGNAIZATIONS_RES,
      data: data
    })
  },
  receiveOraganization:function(data){
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_ORGNAIZATION_RES,
      data: data
    })
  }
};
module.exports=oraganizationActions;
