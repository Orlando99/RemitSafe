import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Divider, Image, Input } from 'semantic-ui-react';
import axios from 'axios';
import { getAPIUrl } from '../../awshelper';
import toastr from 'toastr';
import Spinner from '../../Spinner';
import adminStore from '../../../stores/adminStore';
import vendorStore from '../../../stores/vendorStore'
import buyerStore from '../../../stores/buyerStore'

export default class AddRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            isLoad: false,
            modalOpen: false
        }
    }


    handleOpen = () => {
        var userorgid = adminStore.getOraganization();
        if (userorgid != null && typeof userorgid != "undefined") {
            this.setState({ isLoad: true });
            if (this.props.isBuyer) {
                buyerStore.assginBuyer(userorgid.id, this.props.id, this.props.companyname, (res) => {
                    this.setState({ isLoad: false });
                    if (res != '') {
                        this.emailVerification(res.id);
                    }
                });
            }
            else {
                vendorStore.assginVendor(userorgid.id, this.props.id, this.props.companyname, (res) => {
                    this.setState({ isLoad: false });
                    if (res != '') {
                        this.emailVerification(res.id);
                    }

                });
            }

        }
    }
    emailVerification = (id) => {
        const companyname = adminStore.getOraganization().name;
        var data = {
            id,
            "email": this.props.email,
            companyname,
            isBuyer: this.props.isBuyer
        };

        adminStore.sendVerificationEmail(data, () => {

        });
    }
    handleChange = (e) => {
        const newState = this.state;
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    handleClose = () => {
        const { companyName, contactName, contactPhone, contactEmail } = this.state;
        this.setState({ isLoad: true });
        const buyerid = this.props.buyerid;
        axios.post(getAPIUrl() + 'sendvendreq', {
            companyname: companyName,
            contactname: contactName,
            phone: contactPhone,
            email: contactEmail,
            buyerid: buyerid
        }).then((response) => {
            toastr.success('Request Sent');
            this.setState({ modalOpen: false, isLoad: false });
        })
            .catch((error) => {
                toastr.error(error);
                console.log(error);
                this.setState({ isLoad: false });
                window.location.reload();
            });
        // this.setState({ modalOpen: false })
    };

    // handleUpDate = () => {
    //     // this.props.handleUpdate()
    //     this.handleClose()
    // }

    render() {
        const { value } = this.state;
        console.log(this.state);
        console.log('this.props.bvi: ', this.props.bvid);
        return (
            <Spinner isLoad={this.state.isLoad} >
                <Modal trigger={<Button disabled={this.props.bvid > 0 ? 'disabled' : ''} style={{
                    textAlign: 'center',
                    background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)',
                    color: '#003366'
                }} onClick={this.handleOpen}>{this.props.isBuyer ? 'LINK BUYER' : 'LINK VENDOR'}</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>

                    <Modal.Header style={{ background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))' }}>
                        <Header as='h3' icon textAlign='center'>
                            <Icon name='user' circular />
                            <Header.Content>
                                Send Vendor RemitSafe® Request
                        </Header.Content>
                        </Header>
                    </Modal.Header>

                    <Modal.Content style={{
                        background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'
                    }}>
                        <form onSubmit={this.handleSubmit} className="ui form attached fluid segment">
                            <div className="field">
                                <label
                                    htmlFor={'companyName'}>Company Name</label>
                                <div className="field">
                                    <Input required="true"
                                        style={{ paddingBottom: 10 }}
                                        type="text" name="companyName"
                                        placeholder="Company Name"
                                        value={this.state.companyName}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <Divider hidden />
                            <div className="three fields">
                                <div className="field">
                                    <label
                                        htmlFor={'contactName'}>Contact Name</label>
                                    <Input required="true" type="text"
                                        name="contactName"
                                        value={this.state.contactName}
                                        onChange={this.handleChange}
                                        placeholder="Jane Doe" />
                                </div>
                                <br />
                                <div className="field">
                                    <label
                                        htmlFor={'contactPhone'}>Contact Phone Number</label>
                                    <Input required="true" type="tel"
                                        name="contactPhone"
                                        value={this.state.contactPhone}
                                        onChange={this.handleChange}
                                        placeholder="212-878-1876" />
                                </div>
                                <br />
                                <div className={"field"}>
                                    <label
                                        htmlFor={'contactEmail'}>Email</label>
                                    <Input required="true" type="email"
                                        name="contactEmail"
                                        value={this.state.contactEmail}
                                        onChange={this.handleChange}
                                        placeholder="vendorEmail@abc.com" />
                                </div>
                            </div>
                        </form>
                    </Modal.Content>

                    <Modal.Actions style={{ background: '#b3bbbf' }}>
                        <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleClose}>
                            <Icon name='send' /> Send Request
                            Update
                    </Button>
                    </Modal.Actions>
                </Modal>
            </Spinner>

        )
    }
}
