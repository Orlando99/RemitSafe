import React, {Component} from 'react';
import {Button, Modal, Icon, Form, Header, Image, Input, Popup, Divider} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class LoggedInView extends Component {
    state = {};


    handleChange = (e, { value }) => this.setState({ value });


    handleOpen = () => {
        this.setState({modalOpen: true})
    };

    handleClose = () => {
        this.setState({modalOpen: false})
    };

    render() {
        const { value } = this.state;
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen} style={{marginBottom: '10px', backgroundColor: 'transparent', color: '#003366'}} role={"button"} floated='right'>
                    <span style={{paddingRight: '5px'}}>Update Details  </span>
                    <Icon style={{color: '#e1aa0a'}} size='large' name='pencil'/>

                </Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}>
            <Modal.Header style={{background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))'}}>
                <Header as='h3' icon textAlign='center'>
                    <Icon name='university' circular />
                    <Header.Content>
                        Edit Remittance Information
                        <div style={{
                            color: '#adff2f', textShadow:
                                '(-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000)'
                        }}
                             className="ui horizontal divider">
                            &
                        </div>
                        Bank Routing Account Details
                    </Header.Content>
                </Header>
            </Modal.Header>
            <Modal.Content
                style={{background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'}}>
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
                                placeholder="5 digit zip code"
                                title="Five digit zip code"/>
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
                                placeholder="zip code"
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
                </form>
            </Modal.Content>
            <Modal.Actions  style={{background: '#b3bbbf'}}>
                <Button color='red' onClick={this.handleClose}>
                    <Icon name='remove'/> Cancel
                </Button>
                <Button color='green' onClick={this.handleClose}>
                    <Icon name='checkmark'/>
                    Update
                </Button>
            </Modal.Actions>
        </Modal>
        )
    }
}