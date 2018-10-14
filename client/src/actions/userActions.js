var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var userActions = {

  // Receive All Users response
  receiveAllUsers: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_ALL_USERS_RES,
      data: data
    })
  },
  receiveUserByOrgId: function (data) {
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_USER_BY_ORGID_RES,
      data: data
    })
  }
};
module.exports = userActions;
//export default buyerActions;