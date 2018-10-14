var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/constants');

var vendorActions = {


  receiveBVendors:function(data){
    AppDispatcher.handleAction({
      actionType: Constants.RECEIVE_B_VRNDORS_RES,
      data: data
    })
  }
};
module.exports=vendorActions;
//export default buyerActions;
