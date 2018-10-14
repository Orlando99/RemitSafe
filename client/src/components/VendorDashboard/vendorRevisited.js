import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Image, Form, Input, Divider, Header, Button} from 'semantic-ui-react';

// const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default class VendorRevisited extends Component {
    state = {
        email: '',
        password: '',
        submittedEmail: '',
        submittedPassword: ''
    };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {email, password} = this.state;

        this.setState({
            submittedEmail: email,
            submittedPassword: password
        })
    };

    handleKeyPress = (e) => {
        if (e.charCode === 32 || e.charCode === 13) {
            e.preventDefault()
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
                        Final Registration Step
                    </h1>
                </div>
                <div className="ui hidden padded divider"/>
                <div className="ui column stackable grid container">
                    <div className="column">
                        <div className="ui attached message">
                            Enter in your credit card details below
                        </div>

                        <div className="ui attached segment"
                             style={{background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.4), rgba(206, 221, 246, 0.4), rgba(220, 236, 255, 0.4))'}}>

                            <Form onSubmit={this.handleChange} className="ui form attached fluid segment">
                                <div className={"field"}>
                                    <label htmlfor="state">Full Name</label>
                                    <Input
                                        required="true"
                                        type="text"
                                        placeholder="Name as it appears on card"
                                    />
                                </div>


                                <div className="field">
                                    <label htmlFor={'bankingInstitution'}>Billing Address</label>
                                    <div className="field">
                                        <input required="true"
                                               style={{paddingBottom: 10}}
                                               type="text"
                                               name="bankingInstitution"
                                               placeholder="Address"/>
                                    </div>
                                </div>

                                <div className="three fields">
                                    <div className={"field"}>
                                        <label htmlfor="state">City</label>
                                        <Input
                                            required="true"
                                            type="text"
                                            placeholder="Atlanta"
                                        />
                                    </div>
                                    <div className="field">
                                        <label
                                            htmlfor="state">
                                            State
                                        </label>
                                        <Input
                                            required="true"
                                            type="text"
                                            placeholder="Georgia"
                                            onChange={this.handleChange}/>
                                    </div>
                                    <div className="field">
                                        <label htmlfor="zip">Zip Code</label>
                                        <Input
                                            required="true"
                                            type="text"
                                            pattern="[0-9]{5}"
                                            placeholder="30066"
                                            title="Five digit zip code"/>
                                    </div>
                                    <br/>

                                </div>
                                <Divider hidden/>
                                <hr style={{
                                    border: '200px solid #003366 !important'
                                }}/>
                                <Divider hidden/>

                                <div className="three fields">
                                    <div className="field">
                                        <label
                                            htmlFor={'Card Number'}>Card Number</label>
                                        <div className="field">
                                            <input
                                                required="true"
                                                type="text"
                                                pattern="[0-9]{16}"
                                                placeholder="1234567890123456"
                                                title="Card Number"
                                                style={{paddingBottom: 10}}/>
                                        </div>
                                    </div>

                                    <div className={"field"}>
                                        <label htmlfor="Expiration">Expiration</label>
                                        <Input
                                            required="true"
                                            type="text"
                                            pattern="[0-9]{8}"
                                            placeholder="12091987"
                                            title="Expiration"/>

                                    </div>
                                    <div className="field">
                                        <label htmlfor="CVC">CVC</label>
                                        <Input
                                            required="true"
                                            type="text"
                                            pattern="[0-9]{4}"
                                            placeholder="1234"
                                            title="CVC"/>
                                    </div>
                                    <br/>
                                </div>
                                <Divider hidden/>
                                <div className=" fluid ui animated attached bottom fade google plus button"
                                     onClick={this.handleClick}
                                     onKeyPress={this.handleKeyPress} tabindex="0">
                                    <div className="visible content">Activate Free Trial</div>
                                    <div className="hidden content">
                                        $99.99 billed quarterly after 14 days
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div className="ui bottom attached message">
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
                                style={{
                                    fontSize: '0.95em',
                                    border: 'none',
                                    padding: '0',
                                    background: 'none',
                                    color: 'greenyellow',
                                    textShadow: "(-1px -1px 0 #878e98, 1px -1px #878e98,-1px 1px 0 #878e98, 1px 1px 0 #878e98')"
                                }}
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