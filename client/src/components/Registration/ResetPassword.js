import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/HeaderNav';
import Footer from '../Nav/Footer';
import { Button, Icon, Input, Image, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getcognitoUser } from '../awshelper';
import toastr from 'toastr';
import Spinner from '../Spinner';
export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            verificationCode: '',
            password: '',
            confirmpassword: '',
            isLoad: false
        }
        this.handleAuthetication = this.handleAuthetication.bind(this);
    }
    handleAuthetication() {
        const { verificationCode, password, confirmpassword } = this.state;
        if (verificationCode === '' && password === '' && confirmpassword === '') {
            toastr.error('Please enter the require details');
            return;
        }
        if (password != confirmpassword) {
            toastr.error('Passwords not matched !');
            return;
        }
        if(password.length < 8)
        {
            toastr.error('Min Password length should be 8 character');
            return
        }
        
        var that = this;
        this.setState({ isLoad: true });
        var cognitoUser = getcognitoUser(this.props.match.params.email);
        cognitoUser.confirmPassword(verificationCode, password, {
            onSuccess() {
                toastr.success('Password reset confirmed!');
                that.setState({ isLoad: false });
                that.context.router.history.push("/");
            },
            onFailure(err) {
                toastr.error('Password not confirmed!');
                that.setState({ isLoad: false });
            }
        });
    }
    render() {
        return (
            <Spinner isLoad={this.state.isLoad}>
                {/*<Nav />*/}
                {/*<Divider hidden />*/}
                {/*<Divider hidden />*/}

                <div className="ui raised container text segment" style={{ background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1)' }}>
                    <div className="ui attached message">
                        <div className="header">
                            <h3>RemitSafe® Password Reset</h3>
                        </div>
                        <p><i>We have sent a code to the phone number on file for your account. Please enter the number below and set a new password.</i></p>
                    </div>
                    <div className="ui form attached fluid segment">
                        <div className="two fields">
                            <div className="field">
                                <label
                                    htmlFor="text">Unique Code</label>
                                <Input
                                    required="true"
                                    type="text"
                                    placeholder="Unique Code"
                                    onChange={(event) => { this.setState({ verificationCode: event.target.value }) }} />

                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label
                                    htmlFor="text">New Password</label>
                                <Input
                                    required="true"
                                    type="password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    placeholder="New Password"
                                    onChange={(event) => { this.setState({ password: event.target.value }) }} />

                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label
                                    htmlFor="text">Re-enter Password</label>
                                <Input
                                    required="true"
                                    type="password"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    placeholder="Re-enter password"
                                    onChange={(event) => { this.setState({ confirmpassword: event.target.value }) }} />

                            </div>
                        </div>
                        <div style={{ paddingBottom: '5%' }} className="ui clearing inline field">
                            <br /><br />
                            <Button primary onClick={this.handleAuthetication}>Reset</Button>
                        </div>
                    </div>
                    <div className="ui attached primary message" style={{ background: '#b3bbbf' }}>
                    </div>
                    <div className="ui hidden divider" />
                </div>
                <Footer />
            </Spinner>
        )
    }
}
ResetPassword.contextTypes = {
    router: PropTypes.object.isRequired
};