import appConfig from "../config";
import toastr from 'toastr';
var AWS = require("aws-sdk");
var AWSCognito = require("amazon-cognito-identity-js");
var poolData = {
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId
};
AWS.config.update({ region: appConfig.region });
const userPool = new AWSCognito.CognitoUserPool(poolData);

function getUserPool() {
    return userPool;
}

function getcognitoUser(username) {
    var userData = {
        Username: username,
        Pool: userPool
    };
    return new AWSCognito.CognitoUser(userData);
}

function getAutheticationDetails(username, password) {
    var authenticationData = {
        Username: username,
        Password: password
    };
    return new AWSCognito.AuthenticationDetails(authenticationData);
}
function checkSession(callback) {
    // callback(true);
    // return;
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
            if (session == null) {
                callback(false);
            }
            else {
                callback(session.isValid());
            }
        });
    }
    else {
        callback(false);
    }
}
function signOut() {
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.signOut();
    }
}

function getCredentials(userToken, callback) {
    console.log("Getting temporary credentials");
    let logins = {};
    logins[
        "cognito-idp." + appConfig.region + ".amazonaws.com/" + appConfig.UserPoolId
    ] = userToken;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: appConfig.IdentityPoolId,
        Logins: logins
    });

    AWS.config.credentials.get(function (error) {
        if (error) {
            toastr.error(error);
        } else {
            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();
            console.log('Successfully logged!');
        }
        callback();
    });
}
function getAPIUrl() {
    return appConfig.API_URL;
}
function deleteUser(username,callback) {
    const provider = new AWS.CognitoIdentityServiceProvider();
    let params = {
        UserPoolId: appConfig.UserPoolId,
        Username: username
    };
    provider.adminDeleteUser(params, function (err, data) {
        if (err) {
            toastr.error(err);
        } else {
            console.log(data);
        }
        callback(err);
    });
}
export {
    getUserPool,
    getcognitoUser,
    getAutheticationDetails,
    getCredentials,
    getAPIUrl,
    checkSession,
    signOut,
    deleteUser
}