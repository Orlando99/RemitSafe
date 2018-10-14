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
export default class IdentityVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleVerification = (e) => {
        this.context.router.history.push("verify");
    }
    render() {

        return (
            <Spinner isLoad={this.state.isLoad}>
                <Nav isLogout="false" />
                <Divider hidden />
                <Divider hidden />
                <center><br />
                    <div className={"ui raised card width360"} ref={"logincard"}>
                        <div style={{ background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} className={"content"}>
                            <div className={"ui container"}>
                                <div className={"header"}>
                                    <Image style={{ width: "80%" }} src='../images/RemitSafe-logo-dark_small-transparent.png' />
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div style={{ fontWeight: 700 }} className={"ui form"}>
                                <p><strong>Which method of identify verification would you like to use: </strong></p>
                                <br />
                                <table>
                                    <tr>
                                        <td>
                                            <label style={{
                                                display: "block",
                                                paddingBottom: 2,
                                                fontWeight: 700
                                            }}
                                                class="side-by-side"
                                                htmlFor="emailinput">Send email to : XXXXXX@gmail.com</label>

                                        </td>
                                        <td>
                                            <Button class="side-by-side" primary onClick={this.handleVerification}>Send</Button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </center>
                <br />
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
                <Footer />
            </Spinner>
        );
    }
}

IdentityVerification.contextTypes = {
    router: PropTypes.object.isRequired
};


