import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav.js';
import Footer from '../Nav/Footer';
import { Button, Icon, Input, Image, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getcognitoUser, getUserPool, checkSession } from '../awshelper';
import toastr from 'toastr';
import Spinner from '../Spinner';
export default class AutheticateByCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authcode: '',
            isLoad: false
        }

        this.handleAuthetication = this.handleAuthetication.bind(this);
        window.onbeforeunload = function () {
            return 'are you sure';
        };
    }
    componentDidMount() {

    }
    handleAuthetication() {
        this.setState({ isLoad: true });
        var cognitoUser = getcognitoUser(this.props.match.params.method);
        cognitoUser.confirmRegistration(this.state.authcode, true, (err, result) => {
            this.setState({ isLoad: false });
            if (err) {
                //toastr.error(err.message);
                toastr.error("We do not recognize the code you have entered below. Please enter the correct code before clicking Confirm Code")
                return;
            }
            else {
                this.context.router.history.push('/profileregister');
            }
        });

    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleAuthetication();
        }
    }
    render() {
        return (
            <Spinner isLoad={this.state.isLoad}>

                <Divider hidden />
                <Divider hidden />

                <div className="ui raised container text segment marginBottom" style={{ background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1)', 'width': '35%' }}>
                    <div className="ui attached message">
                        <div className={"header"}>
                            <Image style={{ width: "80%" }} src='../images/RemitSafe-logo-dark_small-transparent.png' />
                        </div>
                    </div>
                    <div className="ui form attached fluid segment">
                        <h4>RemitSafe Phone Verification</h4>
                        <p>Please enter the code that was texted to your phone in order to verify your identity and complete registration.
                        </p>
                        <div className="field">
                            <label>Enter Code</label>
                            <Input
                                autoFocus
                                required="true"
                                type="text"
                                placeholder="Enter the code you recieved on your phone here"
                                onKeyPress={this.handleKeyPress}
                                onChange={(event) => { this.setState({ authcode: event.target.value }) }} />

                        </div>

                        <div style={{ paddingBottom: '5%' }} className="ui clearing inline field rs-zindex">
                            <br /><br />

                            <Button animated style={{ marginTop: '-4%', background: '#3b5998' }}
                                className="ui right floated primary button" onClick={this.handleAuthetication}>
                                <Button.Content visible>
                                    <Link style={{ color: '#FFF' }} to="#">Confirm Code</Link>
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>

                        </div>
                    </div>

                    <div className="ui hidden divider" />
                </div>
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
                <Footer />
            </Spinner>

        );
    }
}
AutheticateByCode.contextTypes = {
    router: PropTypes.object.isRequired
};
