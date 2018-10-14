import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Checkout from './Checkout';


//AWS Cognito Imports
import { Config, CognitoIdentityCredentials } from "aws-sdk";
import {
    CognitoUserPool,
    CognitoUserAttribute
} from "amazon-cognito-identity-js";

// Component Imports

import Login from "./components/Login/login";
import Logout from "./components/Logout/logout";
import InitRegistration from "./components/Registration/Global Registration Page/globalregistrationpage";
import BuyerRegistration from "./components/Registration/Buyer/buyer";
import VendorRegistration from "./components/Registration/Vendor/vendor";
import PasswordAssist from "./components/PasswordAssist/passwordassist";
import VendorDashboard from './components/VendorDashboard/vendorDashboard';
import BuyerDashboard from './components/BuyerDashboard/buyerDashboard';
import NotFound from "./components/NotFound/NotFound";
import TableDynamic from "./components/BuyerDashboard/table";
import Admin from './components/AdminDash/AdminDash';
import VendorRevisited from './components/VendorDashboard/vendorRevisited';


import AutheticateByCode from './components/Registration/AutheticateByCode';
import ResetPassword from './components/Registration/ResetPassword';
import IdentityVerification from './components/Login/IdentityVerification';
import VerifyIndentity from './components/Login/VerifyIndentity';
import ProfileRegistration from './components/Registration/ProfileRegistration'
import venDashboard from './components/VendorDashboard/venDashboard';
import addVendor from './components/VendorDashboard/addVendor';
import addBuyer from './components/BuyerDashboard/addBuyer';
import buyDashboard from './components/BuyerDashboard/buyDashboard';
import EditRemit from './components/BuyerDashboard/editRemitInfo';
import ViewRemitLabel from './components/BuyerDashboard/ViewRemitInfoLabels';
import EditCompany from './components/BuyerDashboard/editCompanyInfo';
import VerifyAssginVendorBuyer from './components/Registration/VerifyAssginVendorBuyer';
import VerifyEmail from './components/Registration/VerifyEmail';
//Config file imports
import appConfig from "./config";
import './semantic/semantic.min.css';
import '../../node_modules/toastr/build/toastr.css';
import './site.css';


// Admin Views
import AdminDashboard from './components/Administration/homeAdminDashboard/AdminDashboard';
import PendingVerifications from './components/Administration/pendingVerification/PendingView';
import AllUsers from './components/Administration/viewUsersDashboard/UsersDashboard';
import AllOrgsDashboard from './components/Administration/viewOrganizationsDashboard/AllOrgsDashboard';
import OranizationsEntityView from './components/Administration/organizationEntity/OrganizationEntityProfileView';
import OrganizationLinks from './components/Administration/organizationEntity/BuyerVendorLinksBox';
import RemittanceInfo from './components/Administration/organizationEntity/RemittanceInformation';
import EditRemitInfoAdmin from './components/Administration/organizationEntity/EditRemitInfoAdmin';
import ViewLogs from './components/Administration/organizationEntity/ViewLogs';

const App = () => (
    <Router>
        <div className="has-header-footer">
            <Switch>
                <Route exact path="/" component={Login} />
                {/* Initial Registration */}
                <Route exact path="/register" component={InitRegistration} />
                {/* Vendors Registration */}
                {/*<Route exact path="/register/alpha" component={VendorRegistration} />*/}
                {/*<Route exact path="/alpha_road" component={VendorRevisited} />*/}
                {/* Buyers Registration */}
                {/*<Route exact path="/register/omega" component={BuyerRegistration} />*/}
                {/* Dashboards */}
                {/*<Route exact path="/a_authenticated/dashboard" component={VendorDashboard} />*/}
                {/*<Route exact path="/o_authenticated/dashboard/:email" component={BuyerDashboard} />*/}


                <Route exact path='/admin' component={Admin} />

                {/* Help and Logout */}
                <Route exact path="/help" component={PasswordAssist} />
                <Route exact path="/logout" component={Logout} />
                {/*<Route exact path="/test" component={TableDynamic} />*/}
                <Route exact path="/autheticateCode/:method" component={AutheticateByCode} />
                <Route exact path="/resetpassword/:email" component={ResetPassword} />
                <Route exact path="/identityverfication" component={IdentityVerification} />
                <Route exact path="/verify" component={VerifyIndentity} />
                <Route exact path="/profileregister" component={ProfileRegistration} />
                <Route exact path="/buyer" component={venDashboard} />
                <Route exact path="/vendor" component={buyDashboard} />
                <Route exact path="/addvendor" component={addVendor} />

                <Route exact path="/editremit" component={EditRemit} />
                <Route exact path="/viewremit" component={ViewRemitLabel} />

                <Route exact path="/viewcompany" component={EditCompany} />
                <Route exact path='/addbuyer' component={addBuyer} />
                <Route exact path='/verifyorg' component={VerifyAssginVendorBuyer} />
                <Route exact path='/verifyemail' component={VerifyEmail} />

                {/* Admin Views */}
                <Route exact path='/NowTeamDashboard' component={AdminDashboard} />
                <Route exact path='/NowTeamDashboard/pendingverifications' component={PendingVerifications} />
                <Route exact path='/NowTeamDashboard/users' component={AllUsers} />
                <Route exact path='/NowTeamDashboard/organizations' component={AllOrgsDashboard} />
                <Route exact path='/NowTeamDashboard/editremitinfoadmin/:remitid' component={EditRemitInfoAdmin} />

                {/*************** DHAVAL ************************/}
                {/* Replace EntityName with Organization Name */}
                <Route exact path='/NowTeamDashboard/organizations/:entityname/profile/:id' component={OranizationsEntityView} />
                <Route exact path='/NowTeamDashboard/organizations/:entityname/links/:id' component={OrganizationLinks} />
                <Route exact path='/NowTeamDashboard/organizations/:entityname/remittance/:id' component={RemittanceInfo} />
                <Route exact path='/NowTeamDashboard/organizations/:entityname/logs/:id' component={ViewLogs} />


                {/* If wrong/bad URL go here */}
                <Route component={NotFound} />


            </Switch>
        </div>
    </Router>
);

export default App;
