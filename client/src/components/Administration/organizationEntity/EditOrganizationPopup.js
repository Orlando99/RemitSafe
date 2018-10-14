import React, { Component } from 'react'
import { Button, Input, Icon, Divider, Modal, Header } from 'semantic-ui-react'
import CommonFunctions from '../../../CommonFunctions';
import Spinner from '../../Spinner';
import toastr from 'toastr';
//Stores
import adminStore from '../../../stores/adminStore';
import oraganizationStore from '../../../stores/oraganizationStore';
import logStore from '../../../stores/logStore';

export default class EditOrganizationPopup extends React.Component {
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
            cname: '',
            open: false,
            orgid: 0
        };
    }

    componentWillReceiveProps(props, nextState) {
        var props = oraganizationStore.getOraganizationForHeader();
        if (props != null) {
            this.setState({
                add1: props.address1,
                add2: props.address2,
                cname: props.name,
                city: props.city,
                state: props.state,
                country: props.country,
                zip: props.zip,
                phone: props.phone,
                orgid: props.id
            });
        }

    }
    handleSave = (e) => {
        this.setState({ isLoad: true });
        let data = {
            name: this.state.cname,
            address1: this.state.add1,
            address2: this.state.add2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phone: this.state.phone,
            country: this.state.country,
            orgid: this.state.orgid,
        }
        adminStore.saveOraganization(data, (re) => {
            this.setState({ isLoad: false });
            oraganizationStore.loadOraganization(data.orgid);
            if (re === true) {
                toastr.success('oraganization updated successfully');
                this.setState({ open: false });
                let logdata = {
                    action: 'Profile Changed',
                    detail: 'Organization  profile has been changed by user'
                }
                logStore.logEvents(logdata);
            }
        })
    }
    handleChange = (e) => {
        const newState = this.state;
        if (e.target.name == "phone") {
            newState["isValidNumber"] = CommonFunctions.validatePhoneNumber(e.target.value)
        }
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleCancel = (e) => {
        this.setState({ open: false });
    }
    render() {
        let phonefieldclass = this.state.isValidNumber ? "field" : "field error";
        return (
            <Modal trigger={<Button primary onClick={this.handleOpen}>Edit</Button>}
                open={this.state.open}>

                <Modal.Header
                    style={{
                        background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))'
                    }}>
                    <Header as='h3' icon textAlign='center'>
                        {/*<Icon name='user' circular />*/}
                        <Header.Content>
                            <span>Edit Oraganization</span>
                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content style={{
                    background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'
                }}>
                    <Spinner isLoad={this.state.isLoad} >
                        <form className="ui form attached fluid segment">
                            <div className="field">
                                <label
                                    htmlFor={'companyName'}>Company Name</label>
                                <div className="field">
                                    <Input required="true"

                                        style={{ paddingBottom: 10 }}
                                        type="text" name="companyName"
                                        placeholder="Company Name"
                                        value={this.state.cname}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label>Street Address 1</label>
                                <Input required="true" type="text"
                                    name="add1"
                                    value={this.state.add1}
                                    onChange={this.handleChange}
                                    placeholder="Street Address 1" />
                            </div>
                            <div className="field">
                                <label>Street Address 2</label>
                                <Input required="true" type="text"
                                    name="add2"
                                    value={this.state.add2}
                                    onChange={this.handleChange}
                                    placeholder="Street Address 2" />
                            </div>
                            <br />
                            <div className="three fields">
                                <div className="field">
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
                                <div className="field">
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

                                <div className="field">
                                    <label>Country</label>
                                    <select className="ui fluid dropdown" name="country" value={this.state.country} onChange={this.handleChange}>
                                        <option value="US">United States</option>
                                    </select>
                                </div>
                            </div>
                            <div class="two fields">
                                <div className="field">
                                    <label htmlfor="zip">Zip Code</label>
                                    <Input
                                        required="true"
                                        type="text"
                                        pattern="[0-9]{5}"
                                        placeholder="30066"
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
                        </form>
                    </Spinner>
                </Modal.Content>

                <Modal.Actions style={{ background: '#b3bbbf' }}>
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleSave}>
                        <Icon name='send' /> Save
                                </Button>
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleCancel}>
                        <Icon name='cancel' /> Cancel
                                </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}