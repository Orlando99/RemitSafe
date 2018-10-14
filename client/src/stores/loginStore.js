import {
    getcognitoUser,
    getAutheticationDetails,
    getCredentials
} from '../components/awshelper';

import toastr from 'toastr';
import axios from 'axios';
import { getAPIUrl } from '../components/awshelper';
import adminStore from './adminStore';
import logStore from './logStore';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/constants');
var _ = require('underscore');


var _loginresponse = '';
var _dbUser = '';
var _userEmail = '';
var cognitoUser, regUser, isUpdate;
var loginStore = _.extend({}, EventEmitter.prototype, {

    // Return Product data
    getLoginResponse: function () {

        return _loginresponse;
    },
    getLoginCognitoUser: function () {
        return cognitoUser;
    },
    getDbUser: function () {
        if (localStorage.getItem('dbUser') != null) {
            return JSON.parse(localStorage.getItem('dbUser'));
        }
        else {
            return {};
        }

    },
    getUserType: function () {
        return JSON.parse(localStorage.getItem('dbUser')).usertype;
    },
    getUserPermission: function () {
        return JSON.parse(localStorage.getItem('dbUser')).permission;
    },
    // Emit Change event
    emitChange: function () {
        this.emit('change');
    },
    saveIsUpdateOrg: function (isupdate) {
        isUpdate = isupdate;
    },
    // Add change listener
    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    saveregisterdUser: function (user) {
        localStorage.setItem('regUser', JSON.stringify(user));
    },
    saveProfile: function (data, callback) {
        const regData = JSON.parse(localStorage.getItem('regUser'));
        const { add1, add2, city, state, country, zip, phone, cname, orgid } = data;

        if (isUpdate) {
            localStorage.setItem('email', regData.email);
            loginStore.getUser((userdata) => {
                var orgData = {
                    name: cname,
                    address1: add1,
                    address2: add2,
                    city: city,
                    state: state,
                    zip: zip,
                    phone: phone,
                    country: country,
                    orgid: userdata.orgid,
                    isregistered: 1
                }
                adminStore.saveOraganization(orgData, () => {
                    loginStore.saveUser(userdata.orgid, (data) => {
                        let logData = {
                            action: 'Registration Update',
                            detail: userdata.firstName + ' ' + userdata.lastName + ' updated the registration information'
                        }
                        logStore.logEvents(logData);
                        callback(data);
                    });
                });
            })
        }
        else {
            if (orgid > 0) {
                loginStore.saveUser(orgid, 0, (data) => {
                    let regUser = JSON.parse(localStorage.getItem('regUser'))
                    let logData = {
                        action: 'Registration Existing Oraganization',
                        detail: regUser.fname + ' ' + regUser.lname + ' registered into the system with existing organization ' + cname
                    }
                    logStore.logEvents(logData);
                    callback(data);
                });
            }
            else {
                axios.post(getAPIUrl() + 'createOrganization', {
                    name: cname,
                    address1: add1,
                    address2: add2,
                    city: city,
                    state: state,
                    country: country,
                    zip: zip,
                    phone: phone,
                    isregistered: 1
                }).then((response) => {
                    loginStore.saveUser(response.data.id, 2, (data) => {
                        let regUser = JSON.parse(localStorage.getItem('regUser'))
                        let logData = {
                            action: 'Registration',
                            detail: regUser.fname + ' ' + regUser.lname + ' registered into the system'
                        }
                        logStore.logEvents(logData);
                        callback(data);
                    });
                }).catch(function (error) {
                    toastr.error(error);
                    callback(false);
                });
            }

        }

    },
    saveUser: function (orgid, permission, callback) {
        const { email, fname, lname } = JSON.parse(localStorage.getItem('regUser'));
        axios.post(getAPIUrl() + 'createUser', {
            email: email,
            firstname: fname,
            lastname: lname,
            orgid: orgid,
            permission: permission
        }).then((response) => {
            callback(true);
        }).catch(function (error) {
            toastr.error(error);
            callback(false);
        });
    },
    getUser: function (callback) {
        loginStore.getUserFromDb(localStorage.getItem('email'), (res) => {
            callback(res);
        });
    },
    getUserFromDb: function (email, callback) {
        axios.post(getAPIUrl() + 'getUser', {
            email: email
        }).then((response) => {
            localStorage.setItem('dbUser', JSON.stringify(response.data[0]));
            callback(loginStore.getDbUser())
        }).catch(error => {
            toastr.error(error);
            callback(loginStore.getDbUser())
        })
    },
    getUserById: function (id, callback) {
        axios.post(getAPIUrl() + 'getuserbyid', {
            id: id
        }).then((response) => {
            callback(response.data)
        }).catch(error => {
            toastr.error(error);
            callback(null)
        })
    },
    upateUser: function (data, callback) {
        axios.post(getAPIUrl() + 'updateuser', {
            data
        }).then((response) => {
            callback(response.data)
        }).catch(error => {
            toastr.error(error);
            callback(null)
        })
    },
    deleteUser: function (id, callback) {
        axios.post(getAPIUrl() + 'deleteuser', {
            id: id
        }).then((response) => {
            callback(response.data)
        }).catch(error => {
            toastr.error(error);
            callback(null)
        })
    },
    checkEmailConfirm: function (callback) {
        cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
                alert(err);
                callback(false);
            }
            var isEmail = false;
            for (var i = 0; i < result.length; i++) {
                if (result[i].getName() == "email_verified" && result[i].getValue() == "false") {
                    isEmail = true;
                }
            }
            callback(isEmail);
        })
    },
    verifyPhoneIdentity: function (verificationCode, callback) {
        cognitoUser.sendMFACode(verificationCode, {
            onSuccess: (result) => {
                _loginresponse = result;
                getCredentials(result.getIdToken().getJwtToken(), () => {
                    if (_loginresponse) {
                        localStorage.setItem('email', _loginresponse.accessToken.payload.username);
                    }
                    let data = {
                        action: 'Login',
                        detail: _loginresponse.accessToken.payload.username + ' has successfully loged in '
                    }
                    logStore.logEvents(data);
                    callback(true);
                })

            },
            onFailure: (result) => {
                // toastr.error(result);
                toastr.error("We do not recognize the code you have entered below. Please enter the correct code before clicking Confirm Code");
                callback(false)
            }
        });
    },

    autheticateUser: function (email, password, callback) {
        cognitoUser = getcognitoUser(email);
        cognitoUser.authenticateUser(getAutheticationDetails(email, password), {
            onSuccess: (result) => {

            },
            onFailure: (err) => {
                toastr.error(err.message);
                callback(false);
            },

            mfaRequired: function (codeDeliveryDetails) {
                callback(true);
                // var verificationCode = prompt('Please input verification code', '');
                /* cognitoUser.sendMFACode(verificationCode, {
                     onSuccess: (result) => {
                         console.log("========1=========");
                         console.log(result);
                         result.getIdToken().getJwtToken();
                         _loginresponse=result;
                         cognitoUser.getUserAttributes(function (err, result) {
                             if (err) {
                                 alert(err);
                                 callback(false);
                             }
                             var isEmail = false;
                             for (var i = 0; i < result.length; i++) {
                                 if (result[i].getName() == "email_verified" && result[i].getValue() == "false") {
                                     isEmail = true;
                                 }
                             }
                             if (isEmail) {
                                 cognitoUser.getAttributeVerificationCode('email', {
                                     onSuccess: function (result) {
                                         console.log('call result: ' + result);
 
                                     },
                                     onFailure: function (err) {
                                         toastr.error(err);
                                     },
                                     inputVerificationCode: function () {
                                         var verificationCode = prompt('We have sent a code to your email address. Once you receive this code, please enter it below to continue and verify your email address. ', '');
                                         cognitoUser.verifyAttribute('email', verificationCode, this);
                                         toastr.success('login success');
                                         callback(true);
                                     }
                                 });
                             }
                             else {
                                 callback(true);
                             }
 
                         });
                     },
                     onFailure: (result) => {
                         toastr.error(result)
                     }
                 });*/

            },
        });
    },
    getAllUsers: function (callback) {
        axios.get(getAPIUrl() + 'allusers').then((response) => {
            console.log(response.data);
            callback(response.data)
        }).catch(error => {
            toastr.error(error);
            callback();
        })
    },
    verifyEmail: function (email, callback) {
        axios.post(getAPIUrl() + 'verifyemail', {
            email: email
        }).then((response) => {
            callback(true);
        }).catch(function (error) {
            toastr.error(error);
            callback(false);
        });
    },
    sendEmailVerification: function (callback) {
        const { email } = JSON.parse(localStorage.getItem('regUser'));
        axios.post(getAPIUrl() + 'sendemailverification', {
            email: email
        }).then((response) => {
            callback(true);
        }).catch(function (error) {
            toastr.error(error);
            callback(false);
        });
    }
});

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

        // Respond to RECEIVE_LOGIN_RES action
        case Constants.RECEIVE_LOGIN_RES:

            break;


        default:
            return true;
    }

    // If action was responded to, emit change event
    loginStore.emitChange();

    return true;

});

export default loginStore;
//module.exports = loginStore;