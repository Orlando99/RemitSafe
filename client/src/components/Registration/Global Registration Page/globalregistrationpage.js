import React, { Component } from 'react';
import Nav from '../../Nav/Nav.js';
import Footer from '../../Nav/Footer';
import TermsAndConditions from './termsAndConditions';
import { Link } from 'react-router-dom';
import { Button, Input, Image, Dropdown, Icon, Divider } from 'semantic-ui-react'
import axios from 'axios';
import Spinner from '../../Spinner';
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { getUserPool, getcognitoUser, getAPIUrl, checkSession } from '../../awshelper';
import loginStore from '../../../stores/loginStore'
import PropTypes from 'prop-types';
import toastr from 'toastr';
import CommonFunctions from '../../../CommonFunctions';


export default class InitRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: CommonFunctions.getParameterByName('email'),
            password: '',
            confpass: '',
            phone: '',
            //role: '',
            checked: false,
            isLoad: false,
            fname: '',
            lname: '',
            type: '',
            modalOpen: false,
            isValidPassword: true
        }
        if (this.state.email != null) {
            loginStore.saveIsUpdateOrg(true);
        }
        else {
            loginStore.saveIsUpdateOrg(false);
        }

    }


    toggle = () => this.setState({ checked: !this.state.checked });

    handleChange = (e) => {
        var isPass = true;

        if (e.target.name === "phone") {

            if (CommonFunctions.checkPhoneNumber(e.target.value)) {
                const newState = this.state;
                newState[e.target.name] = e.target.value;
                this.setState(newState);
            }
        }
        else if (e.target.name === 'password') {
            const newState = this.state;
            newState[e.target.name] = e.target.value;
            newState["isValidPassword"] = CommonFunctions.validPassword(this.state.password)
            this.setState(newState);
        }
        else {
            const newState = this.state;
            newState[e.target.name] = e.target.value;
            this.setState(newState);
        }
    }
    handleOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ modalOpen: true });
    };
    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    userAgreed = () => {
        this.setState({ checked: true });
        this.handleClose();
    };

    unsatisfactoryTerms = () => {
        this.setState({ checked: false });
        this.handleClose();
    };
    handleValidation = () => {
        toastr.options.positionClass = 'toast-top-center';
        if (this.state.fname == '' || this.state.fname == null) {
            toastr.error("First name is a required field");
            return false;
        }
        else if (this.state.lname == '' || this.state.lname == null) {
            toastr.error("Last name is a required field");
            return false;
        }
        else if (this.state.email == '' || this.state.email == null) {
            toastr.error("Email is a required field");
            return false;
        }
        else if (!this.state.email.includes('@')) {
            toastr.error("Please enter a valid email address");
        }

        else if (this.state.password.length < 8) {
            toastr.error("Passwords must contain a minnimum of 8 characters.");
            return false;
        }
        else if (this.state.password.search(/[A-Z]/) == -1) {
            toastr.error("Passwords must contain atleast 1 upper case letter");
            return false;
        }
        else if (this.state.password.search(/[a-z]/) == -1) {
            toastr.error("Passwords must contain atleast 1 lower case letter");
            return false;
        }
        else if (this.state.password.search(/[0-9]/) == -1) {
            toastr.error("Passwords must contain atleast 1 number");
            return false;
        }
        //  Commented out because it's being handled somewhere else.
        // else if (this.state.password == '' || this.state.confpass == '') {
        //     toastr.error('Passwords must contain atleast 1 symbol');
        //     return false;
        // }

        else if (this.state.password != this.state.confpass) {
            toastr.error('Password and Confirm Password do not match. Please enter the same password in both fields');
            return false;
        }
        else if (this.state.phone == '') {
            toastr.error("Phone number is a required field");
            return false;
        }
        else if (this.state.checked == false) {
            toastr.error('You must agree to the Terms and Conditions to complete registration');
            return false;
        }
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.cname);
        const { password, type, fname, lname, cname } = this.state;

        if (this.handleValidation()) {
            var email = this.state.email.toLowerCase();
            if (CommonFunctions.validateEmail(email)) {
                var phone = this.state.phone;
                this.setState({ isLoad: true });
                const userPool = getUserPool(email);

                if (phone.indexOf('01') == -1)
                    phone = '+01' + phone;
                else
                    phone = '+' + phone;

                const attributeList = [
                    new CognitoUserAttribute({
                        Name: 'email',
                        Value: email,

                    }),
                    new CognitoUserAttribute({
                        Name: 'phone_number',
                        Value: phone,

                    })
                ];
                userPool.signUp(email, password, attributeList, null, (err, result) => {
                    this.setState({ isLoad: false });
                    loginStore.saveregisterdUser(this.state);
                    if (err) {
                        toastr.error(err.message);
                        return;
                    }
                    this.context.router.history.push({    // use push
                        pathname: `/autheticateCode/${result.user.getUsername()}`,
                    });
                    console.log('user is created ' + result.user.getUsername());
                });
            }
        }

    };
   
    render() {
        let passwordclass = this.state.isValidPassword ? "field" : "field error";
        return (
            <Spinner isLoad={this.state.isLoad}>
                <br />
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
                        <div className="ui form attached fluid segment">
                            <p>Please complete the form below to create your RemitSafe account. &nbsp;After this step, &nbsp;you will be asked for your company information and to verify your identity.
                             &nbsp;This verification process will require you to accept a text message to the phone number you enter here.</p><br />
                            <div className={"field"}>
                                <label>First Name</label>
                                <Input
                                    placeholder="Enter your first name"
                                    type="name"
                                    name="fname"
                                    value={this.state.fname}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label>Last Name</label>
                                <Input
                                    placeholder="Enter your last name"
                                    type="name"
                                    name="lname"
                                    value={this.state.lname}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label
                                    htmlFor="email">Email</label>
                                <Input
                                    required="true"
                                    placeholder="Enter your email address"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                            </div>
                            <h4> Passwords must follow these rules:  </h4>
                            <ul>
                                <li> Must be atleast 8 Characters</li>
                                <li> Must contain 1 uppercaase AND 1 lower case letter</li>
                                <li> Include 1 symbol (ex, $, !, %, #)</li>
                                <li> Must contain 1 number </li>
                            </ul>
                            <div className={passwordclass}>
                                <label
                                    htmlFor="password">Password</label>
                                <Input
                                    required="true"
                                    placeholder="Enter a password"
                                    type="password"
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange} />

                            </div>
                            <div className="field">
                                <label
                                    htmlFor="password">Confirm Password</label>
                                <Input
                                    required="true"
                                    placeholder="Re-Enter password"
                                    type="password"
                                    name='confpass'
                                    value={this.state.confpass}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label
                                    htmlFor="phone">Phone</label>
                                <p>Enter a US mobile phone number capable of receiving text messages. </p>
                                <p style={{
                                    color: '#f49b41'
                                }} ><i>Failure to enter a valid phone number that you have access to will prevent you from completing registration.</i> </p>
                                <Input
                                    required="true"
                                    placeholder="Phone number"
                                    type="phone"
                                    name='phone'
                                    value={this.state.phone}
                                    onChange={this.handleChange} />
                            </div>
                            <TermsAndConditions fromFooter={false}
                                userAgreed={this.userAgreed}
                                unsatisfactoryTerms={this.unsatisfactoryTerms}
                                modalOpen={this.state.modalOpen}
                                handleClose={this.handleClose}
                                handleOpen={this.handleOpen}
                                checked={this.state.checked}
                            />
                            <div style={{ paddingBottom: '5%' }} className="ui clearing inline field rs-zindex">
                                <br /><br />
                                <Button animated
                                    style={{
                                        marginTop: '-4%',
                                        background: '#3b5998',
                                    }}
                                    className="ui right floated primary button" onClick={this.handleSubmit}>
                                    <Button.Content visible>
                                        <Link style={{ color: '#FFF' }} to="#">Register</Link>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='right arrow' />
                                    </Button.Content>
                                </Button>
                            </div>
                        </div>


                    </div>

                </div>
                <br />
                <br />
                <Footer />

            </Spinner>

        )
    }
}
InitRegistration.contextTypes = {
    router: PropTypes.object.isRequired
};

