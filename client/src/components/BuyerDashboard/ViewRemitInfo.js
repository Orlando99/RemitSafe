import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Divider, Image, Input, Grid, Label, Segment } from 'semantic-ui-react';
import toastr from 'toastr';
import Spinner from '../Spinner';
import adminStore from '../../stores/adminStore';
import vendorStore from '../../stores/vendorStore'
import buyerStore from '../../stores/buyerStore'
import CommonFunctions from '../../CommonFunctions';
export default class ViewRemitInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remitInfo: '',
            isLoad: false
        }
    }
    handleOpen = () => {
        this.setState({ modalOpen: true, isLoad: true });
        buyerStore.viewRemitInfo(this.props.id, (data) => {
            this.setState({ isLoad: false });
            if (data != null) {
                this.setState({ remitInfo: data });
            }
        });
    }
   
    handleClose = () => {
        this.setState({ modalOpen: false, isLoad: false });
    };
    noDataFound = () => {
        return (
            <Segment textAlign="center" inverted color='red'>
                <label className="paymentInfo center">No Remit Info?</label>
                <br />
                <Label>Why am I seeing this?</Label>
                <br />
                <label className="paymentInfo center">The client has not entered their Remit Info. </label>
            </Segment>
        )
    }


    render() {
        const { value } = this.state;
        console.log(this.state.remitInfo);
        return (

            <Modal trigger={<Button style={{
                textAlign: 'center',
                background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)',
                color: '#003366'
            }} onClick={this.handleOpen}>View</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}>

                <Modal.Header style={{ background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))' }}>
                    <Header as='h3' icon textAlign='center'>
                        <Icon name='user' circular />
                        <Header.Content>
                            View Remit Info
                        </Header.Content>
                    </Header>
                </Modal.Header>

                <Modal.Content style={{
                    background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'
                }}>

                    <form onSubmit={this.handleSubmit} className="ui form attached fluid segment">
                        <Spinner isLoad={this.state.isLoad} >
                            {this.state.remitInfo == "" ? this.noDataFound() :
                                <Grid container columns={2} stretched>
                                    <Grid.Column width={9}>
                                        <div className="ui form attached fluid segment">
                                            <div className="one fields">
                                                <label className="paymentInfo">Payment Address Information</label>
                                            </div>
                                            <div className="one fields">
                                                <div className="field width100">
                                                    <label>Name :   {this.state.remitInfo.remitName}</label>

                                                </div>
                                            </div>
                                            <div className="one fields">
                                                <div className="field width100">
                                                    <label>Street Address 1 :    {this.state.remitInfo.address1}</label>

                                                </div>
                                            </div>
                                            <div className="one fields">
                                                <div className="field width100">
                                                    <label>Street Address 2 :   {this.state.remitInfo.address2}</label>

                                                </div>
                                            </div>
                                            <div className="three fields">
                                                <div className="field width100">
                                                    <label>City :   {this.state.remitInfo.city}</label>

                                                </div>
                                                <div className="field width100">
                                                    <label>State :   {this.state.remitInfo.state}</label>

                                                </div>
                                                <div className="field width100">
                                                    <label>Zip :   {this.state.remitInfo.zip}</label>

                                                </div>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                    <Grid.Column width={7}>
                                        <div className="ui form attached fluid segment">
                                            <div className="one fields">
                                                <label className="paymentInfo">Bank Remittance Information</label>
                                            </div>
                                            <div className="one fields">
                                                <div className="field width100">
                                                    <label>Name :   {this.state.remitInfo.bankName}</label>

                                                </div>
                                            </div>
                                            <div className="one fields">
                                                <div className="field width100">
                                                    <label>Routing Number :   {CommonFunctions.getEncryptRoutingNo(this.state.remitInfo.routingnumber)}</label>

                                                </div>
                                            </div>
                                            <div className="one fields">
                                                <div className="field width100">
                                                    <label>Account Number :   {CommonFunctions.getEncryptAccountNo(this.state.remitInfo.accountnumber)}</label>

                                                </div>
                                            </div>
                                        </div>
                                    </Grid.Column>
                                </Grid>
                            }
                        </Spinner>
                    </form>

                </Modal.Content>

                <Modal.Actions style={{ background: '#b3bbbf' }}>
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleClose}>
                        <Icon name='close' /> Close
                        </Button>
                </Modal.Actions>
            </Modal>


        )
    }
}
