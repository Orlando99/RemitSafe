import React, {Component} from 'react';
// import Stripe from 'react-stripe-elements';
import {Link} from 'react-router-dom';
import CardDisplayDetails from './cardDisplayDetails';
import EditPaymentMethod from '../../components/BuyerDashboard/EditTable/editPaymentMethod';
import {Menu, Image, Form, Input, Divider, Popup, Button} from 'semantic-ui-react';
import WelcomeMessage from '../WelcomeMessage/welcomeMessage';

import LoggedInView from '.././Registration/Vendor/loggedInView';

// const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default class InitRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {email, password} = this.state;

        this.setState({
            email,
            password
        })
    };

    handleKeyPress = (e) => {
        if (e.charCode === 32 || e.charCode === 13) {
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault()
            // this.updateLog('Button received click with keyboard')
        }
    };


    render() {
        return (
            <div>
                <Menu secondary
                      style={{fontWeight: '700', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'}}>
                    <Menu.Item>
                        <Image style={{width: '7.5em'}}
                               src='../../../../images/RemitSafe-logo-dark_small-transparent.png'/>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item name='Logout' style={{color: '#3b5998'}}>
                            <Link to="/logout"> Logout </Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <div className="ui hidden padded divider"/>
                <div className="ui container">
                    <h1 className="ui header">
                        <WelcomeMessage/>
                    </h1>
                </div>
                <div className="ui hidden padded divider"/>
                <div className="ui two column stackable grid container">
                    <div className="column">
                        <div className="ui attached message">
                            Your RemitSafe® Secured Remittance Information
                        </div>
                        {/*<div className="ui hidden divider" />*/}
                        <div style={{background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'}}
                             className="ui attached segment">
                            <div className="ui container">
                                <Form onSubmit={this.handleChange}
                                    className="ui form attached fluid segment">
                                    <div className="field">
                                        <label
                                            htmlFor={'bankingInstitution'}>Banking Institution</label>
                                        <div className="field">
                                            <input required="true" style={{paddingBottom: 10}} type="text"
                                                   name="bankingInstitution"
                                                   placeholder="Your Banking Institution Here"/>
                                        </div>
                                    </div>
                                    <div className="two fields">
                                        <div className={"field"}>
                                            <label htmlfor="routingNo">Routing Number</label>
                                            <Input
                                                required="true"
                                                type="text"
                                                pattern="[0-9]{9}"
                                                placeholder="123456789"
                                                title="Routing Number"/>

                                        </div>
                                        <div className="field">
                                            <label htmlfor="accountingNo">Account Number</label>
                                            <Input
                                                required="true"
                                                type="text"
                                                pattern="[0-9]{10}"
                                                placeholder="1234567890"
                                                title="Bank Account Number"/>
                                        </div>
                                        <br/>
                                    </div>
                                    <Divider/>
                                    <div className="field">
                                        <label
                                            htmlFor={'remittanceAddress1'}>Remittance Address</label>
                                        <div style={{paddingBottom: 10}} className="fields">
                                            <div className={"ten wide field"}>
                                                <Popup
                                                    trigger={<Input icon='question circle' required="true" type="text"
                                                                    name="remittanceAddress1"
                                                                    placeholder="Street Address"/>}
                                                    content='Address where your customers should direct payments'
                                                />
                                            </div>
                                            <br/>
                                            <div className={"six wide field"}>
                                                <input required="true" type="text" name="remittanceAddress2"
                                                       placeholder="Suite #"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="three fields">
                                        <div className={"field"}>
                                            <label htmlfor="state">State</label>
                                            <Input
                                                required="true"
                                                type="text"
                                                placeholder="Georgia"
                                            />
                                        </div>
                                        <div className="field">
                                            <label htmlfor="zip">Zip Code</label>
                                            <Input
                                                required="true"
                                                type="text"
                                                pattern="[0-9]{5}"
                                                placeholder="30066"
                                                title="zip code"/>
                                        </div>
                                        <br/>
                                        <div className="field">
                                            <label
                                                htmlfor="country">
                                                Country
                                            </label>
                                            <Input
                                                required="true"
                                                type="text"
                                                name="United States"
                                                placeholder="USA"
                                                onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </Form>
                            </div>

                        </div>
                        <div className="ui bottom attached message">
                            <LoggedInView/>
                            <Divider hidden/>
                            <p></p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui attached message">
                            Credit Card On File
                        </div>
                        <div style={{background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'}}
                             className="ui attached segment">
                            <Form onSubmit={this.handleChange} className="ui form attached fluid segment">
                                <div className="field">
                                    <p>Below is the card you used when you registered for a RemitSafe account and your
                                        next scheduled payment date.</p>
                                    <p>If you would like to update the card on file, click or tap the update button in the footer below.</p>
                                </div>
                                <div className="field" style={{marginTop: '10px'}}>
                                    <CardDisplayDetails/>
                                    <Divider hidden/>
                                </div>
                                <div style={{background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.8), rgba(206, 221, 246, 0.8), rgba(220, 236, 255, 0.8))', color: '#003366'}}
                                     className=" fluid ui animated fade primary button"
                                     onClick={this.handleClick}
                                     onKeyPress={this.handleKeyPress} tabindex="0">
                                    <div className="visible content">Next Payment Scheduled</div>
                                    <div className="hidden content">
                                        April 6, 2018
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="ui bottom attached message">
                            <EditPaymentMethod/>
                            <Divider hidden/>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="ui hidden divider"/>
                <div className="ui hidden divider"/>
                <div style={{background: '#878e98'}} className="ui inverted center aligned footer segment">
                    <div className="container">
                        <div className="ui hidden divider"/>
                        <Image style={{margin: "0 auto", width: "150px", height: "30px"}}
                               src='../../../../images/RemitSafe-logo-dark_small-transparent.png'
                               className={"ui item"}/>
                        <br/>
                        <p style={{fontSize: '.8em'}}>Copyright © 2010-2018 NOWaccount Network Corporation. All rights
                            reserved. Want to <span>
                            <Button
                                style={{fontSize: '0.95em', border: 'none', padding: '0', background: 'none', color: 'greenyellow', textShadow: "(-1px -1px 0 #878e98, 1px -1px #878e98,-1px 1px 0 #878e98, 1px 1px 0 #878e98')"}}
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