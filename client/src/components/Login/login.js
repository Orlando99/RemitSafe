import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import ReactDOM from "react-dom";
import appConfig from "../../config";
import '../../semantic/semantic.min.css';
import toastr from 'toastr';
import '../../semantic/semantic.min.css';
import Spinner from '../Spinner';
import loginStore from '../../stores/loginStore';
import userauditStore from '../../stores/userauditStore';
import CommonFunctions from '../../CommonFunctions';

import { checkSession } from '../awshelper';

import TermsAndConditions from '../Registration/Global Registration Page/homeTerms';
import '../../assets/css/style.css';
import Footer from "../Nav/Footer";

/////// FUNCTIONS ==========================================================================

//Clearform -- Clears the login form
function clearform() {
    document.getElementById('emailinput').value = '';
    document.getElementById('passinput').value = '';
}

///// REACT CLASSES ==============================================================================


//Build the login form
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            prevemail: '',
            password: '',
            isLoad: false,
            invalidCount: 0
        };
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    componentDidMount() {
        checkSession((isvalid) => {
            if (isvalid == true) {
                if (loginStore.getUserType() === 'admin') {
                    this.context.router.history.push('/NowTeamDashboard');
                }
                else {
                    this.context.router.history.push({    // use push
                        pathname: '/admin'//`/o_authenticated/dashboard/abc@gmail.com`,
                    });
                }
            }
        });
    }

    autheticateUserCall = () => {
        const email = this.state.email.toLowerCase().trim();
        const password = this.state.password.trim();
        this.setState({ isLoad: true });
        if (this.state.invalidCount < 3) {
            loginStore.getUserFromDb(email, (res) => {
                if (typeof res != "undefined" && res != null) {
                    if (res.isemailverify === 1) {
                        if (res.permission == 0) {
                            toastr.options.positionClass = 'toast-top-center';
                            toastr.error("Your Organization Admin has not approved you to join " + res.name+", Please try again later. If you continue to experience issues, please contact <a href='mailto:help@remitsafe.org'>help@remitsafe.org</a>");
                            this.setState({ isLoad: false });
                        }
                        else {
                            loginStore.autheticateUser(email, password, (data) => {
                                this.setState({ isLoad: false });
                                if (data) {
                                    this.setState({ isLoad: true });
                                    userauditStore.deleteUserAudit(email, () => {
                                        this.setState({ isLoad: false });
                                        this.context.router.history.push("verify");
                                    })
                                }
                                else {
                                    this.state.invalidCount++;
                                    this.setState({ invalidCount: this.state.invalidCount });
                                }
                            });
                        }

                    }
                    else {
                        toastr.options.positionClass = 'toast-top-center';
                        toastr.error("Please verify your email to continue");
                        this.setState({ isLoad: false });
                    }
                }
                else {
                    toastr.error("user does not exists");
                    this.setState({ isLoad: false });
                }
            });

        }
        else {
            this.setState({ isLoad: false, prevemail: email });
            toastr.options.positionClass = 'toast-top-center';
            toastr.error("You have been locked out of your account due to unsuccessfully entering your password to many times. Please wait 10 minutes and try again");
            userauditStore.saveUserAudit(email, (res) => {

            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (CommonFunctions.validateEmail(this.state.email)) {
            const email = this.state.email.toLowerCase().trim();
            const password = this.state.password.trim();
            toastr.options.positionClass = 'toast-top-center';
            if (email === '' || password === '') {
                toastr.error("Please enter complete information.");
            }
            else {

                this.setState({ isLoad: true });
                userauditStore.getUserAudit(email, (response) => {
                    if (response != null && response.islocked === 1) {
                        var locktime = new Date(response.createdAt);
                        let now = new Date();
                        var diff = (now.getTime() - locktime.getTime());
                        var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
                        if (diffMins < 11) {
                            this.setState({ isLoad: false });
                            toastr.error("You have been locked out of your account due to unsuccessfully entering your password to many times. Please wait 10 minutes and try again");
                        }
                        else {
                            userauditStore.updateUserAudit(email, response.id, () => {
                                this.setState({ isLoad: false, invalidCount: 0 });
                                this.autheticateUserCall();
                            })
                        }

                    }
                    else {
                        if (this.state.prevemail != "" && this.state.email != this.state.prevemail) {
                            this.setState({ invalidCount: 0 });
                        }

                        this.autheticateUserCall();
                    }
                })


            }
        }
    };

    render() {
        var active = this.state.isLoad ? 'ui active dimmer' : 'ui';
        return (
            <Spinner isLoad={this.state.isLoad} isClass="false">
                <center><br />
                    <div className={"ui raised card"} ref={"logincard"}>
                        <div style={{ background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} className={"content"}>
                            <div className={"ui container"}>
                                <div className={"header"}>
                                    <Image style={{ width: "70%" }} src='../images/RemitSafe-logo-dark_small-transparent.png' />
                                </div>
                            </div>
                        </div>
                        <div className={"content"}>
                            <form style={{ fontWeight: 700 }} className={"ui form"}
                                onSubmit={this.handleSubmit}>
                                <p>Login to access your account.</p>
                                <br />
                                <label style={{
                                    display: "block",
                                    marginLeft: "-85%",
                                    paddingBottom: 2,
                                    fontWeight: 700
                                }}
                                    htmlFor="emailinput">Email</label>
                                <input type="text"
                                    ref="emailinput"
                                    className="field"
                                    value={this.state.email}
                                    placeholder={this.props.name}
                                    onChange={this.handleEmailChange} />
                                <br /><br />
                                <label style={{
                                    display: "block",
                                    marginLeft: "-75%",
                                    paddingBottom: 2,
                                    fontWeight: 700
                                }}
                                    htmlFor="passinput">Password</label>
                                <input type="password"
                                    ref="passinput"
                                    className="field"
                                    value={this.state.password}
                                    placeholder={this.props.name}
                                    onChange={this.handlePasswordChange} />
                                <p style={{ fontSize: '0.8em', marginLeft: '55%' }}>
                                    <Link
                                        style={{ fontWeight: 300 }} to="/help">Forgot your password?</Link></p>
                                <br /><br />
                                {/*<input style={{color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'}}  type="submit" value="Login" className="ui button info"/>*/}

                                <p style={{
                                    fontWeight: 300, width: "50%", padding: "4px", border: "2px solid ##bfbfbf", color: '#003366',
                                    background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'
                                }}>
                                    <input style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} type="submit" value="Login" className="ui button info" />
                                </p>
                                <br /><br />
                                <hr />
                                <br />
                                <p style={{ fontWeight: 300 }}>Not a registered user? <Link style={{ color: "#337aff" }}
                                    onClick={() => clearform()}
                                    to="/register">Register
                                    Now</Link></p>
                            </form>
                        </div>

                    </div>
                </center>
                <br /><br />

                <Footer />

                {/*<div className={"ui center aligned section"}>*/}
                {/*<div style={{ textAlign: "center" }}*/}
                {/*className={"ui-section center aligned ui-spacing-top-extra-large footer"}>*/}


                {/*<div className={"ui-section ui-spacing-none ui-text-center"}>*/}

                {/*<span style={{ fontSize: "0.8em" }} className={"ui-size-mini ui-color-secondary"}>*/}
                {/*©2018 NOWaccount Network Corporation. All rights reserved.<br />*/}
                {/**/}
                {/*<TermsAndConditions fromFooter={true}*/}
                {/*modalOpen={this.state.modalOpen}*/}
                {/*handleClose={this.handleClose}*/}
                {/*handleOpen={this.handleOpen}*/}
                {/*checked={this.state.checked}*/}
                {/*/>*/}

                {/*</span>*/}
                {/*</div>*/}

                {/*</div>*/}


                {/*</div>*/}
            </Spinner>

        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};


