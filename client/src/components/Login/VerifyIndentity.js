import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, Input, Image, Checkbox, Icon, Divider } from 'semantic-ui-react'
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
import Nav from '../Nav/Nav';
import Footer from '../Nav/Footer';


/////// FUNCTIONS ==========================================================================

//Clearform -- Clears the login form
function clearform() {
    document.getElementById('emailinput').value = '';
    document.getElementById('passinput').value = '';
}

///// REACT CLASSES ==============================================================================


//Build the login form
export default class VerifyIndentity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            verificationcode: ''
        };
    }
    handleVerification = (e) => {
        this.setState({ isLoad: true });
        loginStore.verifyPhoneIdentity(this.state.verificationcode, (res) => {
            this.setState({ isLoad: false });

            if (res) {
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
    handleChange = (e) => {
        this.setState({ verificationcode: e.target.value });
    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleVerification();
        }
    }
    render() {

        return (
            <Spinner isLoad={this.state.isLoad} isClass="true">
                <Divider hidden />
                <Divider hidden />

                <div className="ui raised container segment marginBottom"
                    style={{ background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))', 'width': '35%' }}>
                    <div className="ui container">
                        <div className="ui attached message" style={{ background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }}>
                            <div style={{ background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} className={"content"}>
                                <div className={"ui container"}>
                                    <div className={"header"}>
                                        <Image style={{ width: "80%" }} src='../images/RemitSafe-logo-dark_small-transparent.png' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui form attached fluid segment ">
                            <h4>Confirm Your Identity</h4>
                            <p>A unique verification code was sent to the phone number on file for this user. Please enter it below. </p>
                            <br />
                            <div className={"field"}>
                                <label>Enter Code</label>
                                <Input
                                    autoFocus
                                    required="true"
                                    placeholder="Enter the unique code sent to your phone"
                                    type="email"
                                    name="email"
                                    value={this.state.verificationcode}
                                    onKeyPress={this.handleKeyPress}
                                    onChange={this.handleChange} />
                            </div>

                            <div style={{ paddingBottom: '5%' }} className="ui clearing inline field rs-zindex">
                                <br /><br />
                                <Button animated style={{ marginTop: '-4%', background: '#3b5998' }}
                                    className="ui right floated primary button" onClick={this.handleVerification}>
                                    <Button.Content visible>
                                        <Link style={{ color: '#FFF' }} to="#">Confirm</Link>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='right arrow' />
                                    </Button.Content>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui hidden divider" />


                <br />
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
                <Footer isVerify={true} />
            </Spinner>
        );
    }
}

VerifyIndentity.contextTypes = {
    router: PropTypes.object.isRequired
};


