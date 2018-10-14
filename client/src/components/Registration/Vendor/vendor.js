import React, {Component} from 'react';
import Nav from '../../Nav/Nav.js';
import {Link} from 'react-router-dom';
import {Button, Input, Image, Divider, Icon, Popup} from 'semantic-ui-react';
import Modal from "../../Registration/Vendor/RemitModal/remitmodal";


export default class InitRegistration extends Component {
    state = {
        bankingInstitution: '',
        remittanceAddress1: '',
        // remittanceAddress2: '',
        // remittanceState: '',
        // remittanceCountryCode: 'us',
        submittedBankingInstitution: '',
        submittedRemittanceAddress1: '',
        // submittedRemittanceAddress2: '',
        // submittedRemittanceState: '',
        // submittedRemittanceCountryCode: 'us',
        modalOpen: false
    };


    // handleOpen = () => {
    //     this.setState({modalOpen: true})
    // };
    //
    // handleClose = () => {
    //     this.setState({modalOpen: false})
    // };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    //, remittanceState, remittanceCountryCode

    handleSubmit = () => {
        const {bankingInstitution, remittanceAddress1, remittanceAddress2} = this.state;

        this.setState({
            submittedBankingInstitution: bankingInstitution,
            submittedRemittanceAddress1: remittanceAddress1,
            // remittanceAddress2: submittedRemittanceAddress2,
            // remittanceState: submittedRemittanceState,
            // remittanceCountryCode: submittedRemittanceCountryCode,
        })
    };


    render() {
        return (
            <div>
                <Nav/>
                <div className="ui raised container segment" style={{background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))'}}>
                    <div className="ui attached message">
                        <div className="header">
                        </div>
                        <p>Secure Remittance Information</p>
                    </div>
                    <form onSubmit={this.handleSubmit} className="ui form attached fluid segment">
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
                                    <input required="true" type="text" name="remittanceAddress2" placeholder="Suite #"/>
                                </div>
                            </div>
                        </div>
                        <div className="three fields">
                            <div className="field">
                                <label>State</label>
                                <select required="true" className="ui fluid dropdown">
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
                                <label htmlfor="zip">Zip Code</label>
                                <Input
                                    required="true"
                                    type="text"
                                    pattern="[0-9]{5}"
                                    placeholder="30066"
                                    title="zip code"/>
                            </div>
                            <div className="field">
                                <label>Country</label>
                                <select className="ui fluid dropdown">
                                    <option value="us">United States</option>
                                </select>
                            </div>
                        </div>
                        <Divider hidden/>
                        <div style={{
                            color: 'yellowgreen', textShadow:
                                '(-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000)'
                        }}
                             className="ui horizontal divider">
                            AND
                        </div>
                        <Divider hidden/>
                        <div className="ten wide field">
                            <label
                                htmlFor={'bankingInstitution'}>Banking Institution</label>
                            <div className="field">
                                <input required="true" style={{paddingBottom: 10}} type="text" name="bankingInstitution"
                                       placeholder="Your Banking Institution Here"/>
                            </div>
                        </div>
                        <div className="three fields">
                            <div className="field">
                                <label>State</label>
                                <select required="true" className="ui fluid dropdown">
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
                                <label htmlfor="zip">Zip Code</label>
                                <Input
                                    required="true"
                                    type="text"
                                    pattern="[0-9]{5}"
                                    placeholder="30066"
                                    title="zip code"/>
                            </div>
                            <div className="field">
                                <label>Country</label>
                                <select className="ui fluid dropdown">
                                    <option value="us">United States</option>
                                </select>
                            </div>
                        </div>
                        <Divider hidden/>
                        <div className="ui doubling two column centered grid">
                            <div className="column">
                                <Image src="../../../images/checkSample.png" className={"ui centered large image"}/>
                                <br/>
                                <p style={{textAlign: 'center', fontSize: '.8em'}}>
                                    <i>"Please find your routing and bank account numbers in a check from your bank
                                        account.
                                        Confused
                                        about this?"</i>
                                    <Modal/>
                                </p>
                                <br/>
                                <div className="two fields">
                                    <div className="field">
                                        <div className="ui labeled input left">
                                            <div className="ui basic label">
                                                Routing #
                                            </div>
                                            <input
                                                required="true"
                                                type="text"
                                                placeholder={123456789}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui labeled input right">
                                            <div className="ui basic label">
                                                Account #
                                            </div>
                                            <input
                                                required="true"
                                                type="text"
                                                placeholder={9876543210}/>
                                        </div>
                                    </div>
                                </div>
                                <Divider hidden/>

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
                            </div>
                        </div>
                    </form>
                    <div className="ui attached primary message" style={{background: '#b3bbbf'}}>
                    </div>
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