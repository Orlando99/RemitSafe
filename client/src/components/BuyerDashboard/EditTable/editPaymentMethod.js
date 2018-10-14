import React, {Component} from 'react';
import {Button, Modal, Icon, Form, Divider, Input, Header, Image} from 'semantic-ui-react';

export default class EditPaymentMethod extends Component {
    state = {};

    handleChange = (e, {value}) => this.setState({value});


    handleOpen = () => {
        this.setState({modalOpen: true})
    };

    handleClose = () => {
        this.setState({modalOpen: false})
    };

    handleDelete = () => {
        this.props.handleDelete()
        this.handleClose()
    }

    // handleSave = () => {
    //     this.props.handleEditRemitInfo(this.props.cellInfo, this.state)
    // }


    render() {
        const {value} = this.state;
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen} style={{marginBottom: '10px', backgroundColor: 'transparent', color: '#003366'}} role={"button"} floated='right'>
                    <span style={{paddingRight: '5px'}}>Update Details  </span>
                    <Icon style={{color: '#e1aa0a'}} size='large' name='pencil'/>

                </Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}>
                <Modal.Header style={{background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))'}}>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='credit card alternative' circular/>
                        <Header.Content style={{color: '#003366'}}>
                            RemitSafe® Payment Method
                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content style={{background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'}}>
                    <div className="ui column stackable grid container">
                        <div className="column">

                            <div style={{background: 'rgba(196, 205, 229, 0.5)'}} className="ui attached segment">

                                <Form onSubmit={this.handleChange} className="ui form attached fluid segment">
                                    <div className={"field"}>
                                        <label htmlfor="state">Full Name</label>
                                        <Input
                                            credit-card
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
                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.handleClose}>
                        <Icon name='close'/>
                        Cancel Account
                    </Button>
                    <Button color='green' onClick={this.handleClose}>
                        <Icon name='check'/>
                        Update
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

