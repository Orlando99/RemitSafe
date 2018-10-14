// IMPORTS ===============================================================================
// React imports
import React from 'react';
import ReactDOM from 'react-dom';

// Stripe Imports

// Config file imports
import appConfig from './config';
import './semantic/semantic.min.css';

// Import App that stores all the components
import App from './App';
import './assets/css/style.css';
import './site.css';


// SETTINGS AND CONSTANTS ==================================================================


// try {
//     ///SETTINGS AND CONSTANTS ==================================================================
// //Basic AWS Config settings
//     Config.region = appConfig.region;
//     Config.credentials = new CognitoIdentityCredentials({
//         IdentityPoolId: appConfig.IdentityPoolId
//     });
//
// //Define the AWS User pool and get the config values from appConfig.js
//     const userPool = new CognitoUserPool({
//         UserPoolId: appConfig.UserPoolId,
//         ClientId: appConfig.ClientId,
//     });
// } catch(e){
//     console.log("Authentication failed");
// }

ReactDOM.render(<App />, document.getElementById('pagebody'));
