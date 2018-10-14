const PostageApp = require('postageapp')

var postageapp = new PostageApp('S6f6YofgDp8TGIQXLqPFCjbXowCXr2Aq');

function postageapp() {
    return postageapp.postageapp;
}
function vendorRequestTemplate(email) {
    return '<h2>Hi ' + email + '</h2> <br/> <p> You have been added to RemiSafe, Please click below to get registered and enter your secure remittance information. </p> <br/><a href="https://app.nowaccount.com/Account/Create?source=RemitSafe" >Join Now</a>';
}
exports.postageapp = postageapp;
exports.vendorRequestTemplate = vendorRequestTemplate;