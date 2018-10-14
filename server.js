
const express = require('express');
const fs = require('fs');
const db = require('./models');
const app = express();
// const sequelize = require('sequelize');
const PORT = process.env.PORT || 8080;//
const path = require('path');
const bodyParser = require("body-parser");

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const users = require('./routes/api/users');
const organization = require('./routes/api/organization');
const vendors = require('./routes/api/vendors');
const remitInfo = require('./routes/api/remitinfo');
const usersAudit = require('./routes/api/useraudit');
const dashboard = require('./routes/api/dashboardcounts');
const pendingInformation = require('./routes/api/pendingInformation');
const log = require('./routes/api/log');
// app.use(methodOverride());

app.use(express.static("client/build"));
app.get("/", (req, res) => {
    res.send('');
})
//users api 
app.post("/getUser", users.findOne);
app.get('/allusers', users.findAll);
app.post("/createUser", users.createUser);
app.post('/verifyemail', users.verifyEmail);
app.post('/sendemailverification', users.sendEmailVerification);
app.post('/fetchallusers', users.fetchAllUsers);
app.post('/searchuserbyname', users.searchUserByName);
app.post('/loaduserbyid', users.loadUserById)
app.post('/loaduserbyorgid', users.loadUserByOrgId);
app.post('/getuserbyid', users.getUserById);

app.post('/updateuser', users.updateUserFromAdmin);
app.post('/deleteuser', users.deleteUser);

//verndor api
app.post("/sendvendreq", vendors.AddVendorReq);
app.post("/loadvendorbybuyer", vendors.findVendorByBuyer);
app.post('/assginvendor', vendors.AssgineVendor);
app.post('/getbuyerfromvendor', vendors.getBuyerFromVendor);
app.post('/searchvendor', vendors.searchVendor);
app.post('/getbuyerfromvendorcount', vendors.getBuyerFromVendorCount);
app.post('/assginbuyer', vendors.AssgineBuyer);
app.post('/getvendorfrombuyer', vendors.getVendorFromBuyer);
app.post('/getvendorfrombuyercount', vendors.getVendorFromBuyerCount);
app.post('/unassginebuyervendor', vendors.UnassgineBuyerVendor);
app.post('/sendverificationemail', vendors.sendVerificationEmail);
app.post('/verifyassociation', vendors.VerifyAssociation);
app.post('/getbvlinkdetailsbyorg', vendors.GetBVLinkDetailsByOrg);

//organization api
app.post('/createOrganization', organization.createOrganization);
app.post("/getOrganization", organization.getOrganization);
app.post("/updateOraganization", organization.updateOraganization);
app.post('/allOrgs', organization.findAll);
app.post('/allOrgsWithEmail', organization.findWithemail);
app.post('/getallorgs', organization.fetchAllOrgs);
app.post('/searchorgbyname', organization.searchOrgbyName)
app.post('/verifyorg', organization.verifyOrg);
app.post('/getorganizationbyuserid', organization.getOrganizationByUserid);


//remitinfo api
app.post('/addupdateremitinfo', remitInfo.AddUpdateRemitInfo);
app.post('/getremitinfo', remitInfo.getRemitInfo);
app.post('/addupdatebankinfo', remitInfo.AddUpdateBankInfo);
app.post('/getbankinfo', remitInfo.getBankInfo);
app.post('/getremitandbankinfo', remitInfo.getRemitandBankInfo);
app.post('/addupdateremitbankinfo', remitInfo.AddUpdateRemitBankInfo);
app.post('/getremitbankinfo', remitInfo.getRemitBankInfo);
app.post('/getAllRemitBankInfo', remitInfo.getAllRemitBankInfo);
app.post('/updateRemitInfos', remitInfo.updateRemitInfos);
app.post('/updateRemitInfosActive', remitInfo.updateRemitInfosActive);
app.post('/getRemitBankInfoById', remitInfo.getRemitBankInfoById);
app.post('/sendEmailToBuyers', remitInfo.sendEmailToBuyers);


//  Pendings View API
app.post('/graballpending', pendingInformation.grabAllPending);
app.post('/searchpending', pendingInformation.searchPending);
app.post('/loadpendinginfo', pendingInformation.loadPendingInfo);


//user Audit API
app.post('/createuseraudit', usersAudit.createUseraudit);
app.post('/updateuseraudit', usersAudit.updateUseraudit);
app.post('/getuseraudit', usersAudit.getUserAudit);
app.post('/deleteaudit', usersAudit.deleteUseraudit);


//common api
app.get('/getdashboardcounts', dashboard.getDashboardCounts);
app.post('/logevents', log.createLog);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
});
// db.sequelize.sync();
app.listen(PORT, function () {
    console.log('Server running on ', PORT);
    // console.log('DB INfo: ' , db.users.findAll({}) );
});