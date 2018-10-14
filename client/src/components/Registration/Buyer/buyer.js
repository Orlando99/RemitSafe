import React, {Component} from 'react';
import Nav from '../../Nav/Nav.js';
// import WelcomeMessage from '../../WelcomeMessage/welcomeMessage'
import {Link} from 'react-router-dom';
import {Button, Icon, Input, Image} from 'semantic-ui-react';




export default class BuyerRegistration extends Component {
    // state = {
    //     company_name: '',
    //     address1: '',
    //     address2: '',
    //     state: '',
    //     businessCountryCode: 'us',
    //     zip: '',
    //     businessPhone: '',
    //     modalOpen: false
    // };
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            address1: '',
            address2: '',
            state: '',
            zip: '',
            phone_number: '',
            modalOpen: false
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    // handleSubmit = (e) => {}

    //
    // handleSubmit = () => {
    //     const {company_name, address1, address2, state, businessCountryCode, zip, businessPhone, businessEmail } = this.state;
    //
    //     this.setState({
    //         company_name: submittedcompany_name,
    //         address1: submittedaddress1,
    //         address2: submittedaddress2,
    //         state: submittedstate,
    //         businessCountryCode: submittedBusinessCountryCode,
    //         zip: submittedzip,
    //         businessPhone: submittedBusinessPhone,
    //         businessEmail: submittedBusinessEmail,
    //     })
    // };


    render() {
        return (
            <div>
                <Nav/>
                {/*<WelcomeMessage/>*/}
                <div className="ui container">
                    <div className="ui attached message">
                        <div className="header">
                        </div>
                        <p>RemitSafe® Business Registration</p>
                    </div>
                    <form style={{background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.3), rgba(206, 221, 246, 0.3), rgba(220, 236, 255, 0.3))'}} className="ui form attached fluid segment">
                        <div className="two fields">
                        <div className="field">
                            <label
                                htmlFor={'registeredContactName'}>Account Holder's Name</label>
                            <div className="field">
                                <Input
                                    required="true"
                                    type="text"
                                    name="registeredContactName"
                                    placeholder="Account Holder's Name"
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <label
                                htmlFor={'company_name'}>Company</label>
                            <div className="field">
                                <Input
                                    required="true"
                                    type="text"
                                    name="company_name"
                                    placeholder="Company Name"
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        </div>
                        <div className="field">
                            <label>Company Address</label>
                            <div className="fields">
                                <div style={{paddingBottom: 10}} className="ten wide field">
                                    <Input
                                        required="true"
                                        type="text"
                                        name="address1"
                                        placeholder="Street Address"
                                        onChange={this.handleChange}/>
                                </div>
                                <br/>
                                <div className="six wide field">
                                    <Input
                                        required="true"
                                        type="text"
                                        name="address2"
                                        placeholder="Suite #"
                                        onChange={this.handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className="two fields">
                            <div className="field">
                                <label>State</label>
                                <select name="state" required="true" className="ui fluid dropdown">
                                    <option value/>
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
                            <div className="field">
                                <label>Country</label>
                                <select className="ui fluid dropdown">
                                    <option value="us">United States</option>
                                </select>
                            </div>
                        </div>
                        <div className="three fields">
                            <div className="field">
                                <label htmlfor="zip">Zip Code</label>
                                <Input
                                    required="true"
                                    type="text"
                                    name="zip"
                                    pattern="[0-9]{5}"
                                    title="Five digit zip code"/>
                            </div>
                            <div className="field">
                                <label htmlfor="phone">Phone Number</label>
                                <Input
                                    required="true"
                                    ref="phone"
                                    type="text"
                                    name="phone[phone-number]"
                                    title="phone number starting with area code"
                                    placeholder=" (###) (###) - (####)"
                                    onChange={this.handleChange}/>
                            </div>
                            <br/>
                            <div className="field">
                                <label
                                    htmlfor="email">
                                    Email
                                </label>
                                <Input
                                    required="true"
                                    type="email"
                                    name="email"
                                    title="email address"
                                    placeholder="exampleEmail@remitsafe.net"
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div style={{paddingBottom: '5%'}} className="ui clearing inline field">
                            <br/><br/>
                            <Button animated style={{marginTop: '-4%', background: '#3b5998'}}
                                    className="ui right floated primary button">
                                <Button.Content visible>
                                    <Link style={{color: '#FFF'}} to="#">Submit</Link>
                                </Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow'/>
                                    Next
                                </Button.Content>
                            </Button>
                        </div>
                    </form>
                    <div style={{background: '#b3bbbf'}} className="ui attached primary message">
                    </div>
                    <br/>
                    <div style={{padding: 10}} className="ui hidden divider"/>
                </div>
                <br/>
                <div style={{background: '#878e98'}} className="ui inverted center aligned footer segment">
                    <div className="container">
                        <div className="ui hidden divider"/>
                        <Image style={{margin: "0 auto", width: "150px", height: "30px"}}
                               src='../images/RemitSafe-logo-dark_small-transparent.png' className={"ui item"}/>
                        <br/>
                        <p style={{fontSize: '.8em'}}>Copyright © 2010-2018 NOWaccount Network Corporation. All rights
                            reserved. Want to <span>
                            <Button
                                style={{fontSize: '0.95em', border: 'none', padding: '0', background: 'none', color: 'greenyellow', textShadow: "(-1px -1px 0 #878e98, 1px -1px #878e98,-1px 1px 0 #878e98, 1px 1px 0 #878e98')", fontWeight: '700'}}
                                as='a'
                                href='http://remitsafe.wpengine.com'
                                target='_blank'
                            > learn more </Button>?</span></p>
                    </div>
                    <br/>
                </div>
            </div>
        )
    }
}
