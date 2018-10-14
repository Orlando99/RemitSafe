import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, Input, Image, Dropdown, Icon, Divider } from 'semantic-ui-react'
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
import CommonFunctions from '../../CommonFunctions';
import oraganizationStore from '../../stores/oraganizationStore';
/////// FUNCTIONS ==========================================================================

//Clearform -- Clears the login form
function clearform() {
    document.getElementById('emailinput').value = '';
    document.getElementById('passinput').value = '';
}

///// REACT CLASSES ==============================================================================


//Build the login form
export default class ProfileRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            add1: '',
            add2: '',
            city: '',
            state: '',
            country: 'US',
            zip: '',
            phone: '',
            isValidNumber: true,
            cname: CommonFunctions.getParameterByName('company'),
            options: [],
            isFetching: false,
            isExist: false,
            orgid: 0
        };
    }
    saveProfile = () => {
        if (this.state.cname == '' || this.state.cname == null) {
            toastr.error("Company name is a required field");
            return false;
        }
        if (CommonFunctions.validatePhoneNumber(this.state.phone)) {
            this.setState({ isLoad: true });
            loginStore.saveProfile(this.state, (data) => {
                if (data) {
                    loginStore.sendEmailVerification((re) => {
                        this.setState({ isLoad: false });
                        toastr.info("An Email was sent to the register email id, please confirm the emailaddress.");
                        setTimeout(function () {
                            this.context.router.history.push('/');
                        }.bind(this), 3000);
                    });


                }

            })
        }

    }
    handleChange = (e) => {
        const newState = this.state;
        if (e.target.name == "phone") {
            newState["isValidNumber"] = CommonFunctions.validatePhoneNumber(e.target.value)
        }
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    };
    handleAddition = (e, { value }) => {
        this.setState({
            options: [{ text: value, value }, ...this.state.options],
            isExist: false,
            cname: value,
            orgid: 0,
            add1: '',
            add2: '',
            city: '',
            state: '',
            country: 'US',
            zip: '',
            phone: '',
            isValidNumber: true
        })
    }
    handleChangeDD = (e, { value }) => {
        this.setState({ isFetching: true });
        oraganizationStore.loadOraganization(value, (data) => {
            let state = {};
             data = data[0];
            if (data != null) {
                state = {
                    cname: value,
                    isExist: true,
                    orgid: value,
                    add1: data.address1,
                    add2: data.address2,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    zip: data.zip,
                    phone: data.phone,
                    isFetching: false
                }
            }
            else {
                state = { isFetching: false }
            }
            this.setState(state);
        })

    }
    handleSearchChange = (e, { searchQuery }) => {
        this.setState({ isFetching: true });
        oraganizationStore.searchOrgByName(searchQuery, (data) => {
            let optionsData = []
            data.forEach(item => {
                optionsData.push({ key: item.id, text: item.title, value: item.id });
            });
            this.state.options = optionsData;
            this.setState({ options: [...this.state.options], isFetching: false });
        })
    }
    render() {
        let phonefieldclass;
        if (this.state.isValidNumber) {

            phonefieldclass = this.state.isExist ? "field disabled" : "field";
        }
        else {
            phonefieldclass = this.state.isExist ? "field disabled error" : "field  error";
        }
        let fieldclass = this.state.isExist ? "field disabled" : "field"
        return (
            <Spinner isLoad={this.state.isLoad}>
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
                        <div className="ui form attached fluid segment">
                            <h4>Company Profile</h4>
                            <p>Please complete your company profile information, which our team will validate to ensure your security and the security of our users. </p>
                            <br />
                            <div className='field'>
                                <label>Company Name</label>
                                <Dropdown
                                    options={this.state.options}
                                    placeholder='Choose Company'
                                    selection
                                    search
                                    allowAdditions
                                    value={this.state.cname}
                                    onAddItem={this.handleAddition}
                                    onChange={this.handleChangeDD}
                                    loading={this.state.isFetching}
                                    onSearchChange={this.handleSearchChange}
                                />
                            </div>

                            <div className="two fields">
                                <div className={fieldclass}>
                                    <label>Address 1</label>
                                    <Input

                                        placeholder="Enter your street address"
                                        type="name"
                                        name="add1"
                                        value={this.state.add1}
                                        onChange={this.handleChange} />
                                </div>
                                <div className={fieldclass}>
                                    <label>Address 2</label>
                                    <Input

                                        placeholder="Suite No., Building No., etc."
                                        type="name"
                                        name="add2"
                                        value={this.state.add2}
                                        onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="three fields">
                                <div className={fieldclass}>
                                    <label htmlfor="city">City</label>
                                    <Input
                                        required="true"
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={this.state.city}
                                        onChange={this.handleChange}
                                        title="zip code" />
                                </div>
                                <div className={fieldclass}>
                                    <label>State</label>
                                    <select required="true" name="state" className="ui fluid dropdown" value={this.state.state} onChange={this.handleChange}>
                                        <option value />
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                </div>

                                <div className={fieldclass}>
                                    <label>Country</label>
                                    <select className="ui fluid dropdown" name="country" value={this.state.country} onChange={this.handleChange}>
                                        <option value="US">United States</option>
                                    </select>
                                </div>
                            </div>
                            <div class="two fields">
                                <div className={fieldclass}>
                                    <label htmlfor="zip">Zip Code</label>
                                    <Input
                                        required="true"
                                        type="text"
                                        pattern="[0-9]{5}"
                                        placeholder="Zip"
                                        name="zip"
                                        value={this.state.zip}
                                        onChange={this.handleChange}
                                        title="zip code" />
                                </div>
                                <div className={phonefieldclass}>
                                    <label htmlfor="zip">Company Phone</label>
                                    <Input

                                        required="true"
                                        type="text"
                                        placeholder="Phone"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        title="Phone" />
                                </div>
                            </div>
                            <div style={{ paddingBottom: '5%' }} className="ui clearing inline field rs-zindex">
                                <br /><br />
                                <Button animated style={{ marginTop: '-4%', background: '#3b5998' }}
                                    className="ui right floated primary button" onClick={this.saveProfile}>
                                    <Button.Content visible>
                                        <Link style={{ color: '#FFF' }} to="#">Save</Link>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='right arrow' />
                                    </Button.Content>
                                </Button>
                            </div>
                        </div>

                        <div className="ui hidden divider" />
                    </div>
                </div>
                <br />
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
                <Footer />
            </Spinner>
        );
    }
}

ProfileRegistration.contextTypes = {
    router: PropTypes.object.isRequired
};


