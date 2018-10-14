import React from 'react';

import {
    Button,
    Divider,
    Modal,
    Icon, Header, Input
} from 'semantic-ui-react';
import toastr from 'toastr';
import loginStore from '../../stores/loginStore';
import vendorStore from '../../stores/vendorStore';
import adminStore from '../../stores/adminStore'
import Spinner from '../Spinner';
import CommonFunctions from '../../CommonFunctions';
import oraganizationStore from '../../stores/oraganizationStore';
export default class AddVendorRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            modalOpen: false,
            companyName: '',
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            isValidNumber: true,
        };
    }
    handleOpen = () => {
        this.setState({ modalOpen: true });
    }
    handleCancel = () => {
        this.setState({ modalOpen: false });
    }
    handleChange = (e) => {
        const newState = this.state;
        if (e.target.name == "contactPhone") {
            if (CommonFunctions.checkPhoneNumber(e.target.value)) {
                newState[e.target.name] = e.target.value;
                this.setState(newState);
            }

        }
        else {
            newState[e.target.name] = e.target.value;
            this.setState(newState);
        }

    }
    handleClose = () => {
        const { companyName, contactName, contactEmail } = this.state;
        //console.log(adminStore.getOraganization());
        let user = loginStore.getDbUser();
        let requester = adminStore.getOraganization().name;
        let userid = user.id;
        let orgid = adminStore.getOraganization().id;
        if (this.props.isFromAdmin) {
            let orginfo = oraganizationStore.getOraganizationForHeader();
            requester = orginfo.name;
            orgid = orginfo.id;
        }
        let contactPhone = '+01' + this.state.contactPhone;
        var data = {
            companyName,
            contactName,
            contactPhone,
            contactEmail,
            userid,
            requester,
            orgid
        };
        data.isbuyer = this.props.isBuyer;
        if (companyName != '' && contactEmail != '' && CommonFunctions.validatePhoneNumber(contactPhone)) {
            this.setState({ isLoad: true });
            vendorStore.addVendorRequest(data, () => {
                this.setState({ modalOpen: false, isLoad: false });
                toastr.success('Request Sent');
            });
        }
        else {
            toastr.error('Please enter the require details');
        }
    }
    render() {
        var btnCaption = this.props.isBuyer ? "Buyer" : "Vendor";
        let phonefieldclass = this.state.isValidNumber ? "field" : "field error";
        return (

            <Modal trigger={<Button primary onClick={this.handleOpen}>Can’t find your {btnCaption}? Add them manually.</Button>}
                open={this.state.modalOpen}>
                <Modal.Header
                    style={{
                        background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))'
                    }}>
                    <Header as='h3' icon textAlign='center'>
                        {/*<Icon name='user' circular />*/}
                        <Header.Content>
                            {this.props.isBuyer ? <span>Send Buyer RemitSafe® Request</span> : <span>Send Vendor RemitSafe®<sup style={{ color: 'gray' }}>&trade;</sup> Request </span>}
                        </Header.Content>
                        <Header.Content style={{
                            fontSize: '12px',
                            color: 'gray',
                            textAlign: 'left',
                            marginBottom: '-20px'
                        }}>
                            Complete this short form and we will send an email invitation to your {this.props.isBuyer ? <span>Buyer</span> : <span>Vendor</span>}. Once they accept the link and complete their account registration, they will show in your list of {this.props.isBuyer ? <span>Buyers</span> : <span>Vendors</span>}. Shortly thereafter our team will begin the process of making them RemitSafe Verified.
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
                                <div className={phonefieldclass}>
                                    <label
                                        htmlFor={'contactPhone'}>Contact Phone Number</label>
                                    <Input required="true" type="text"
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
                    </Spinner>
                </Modal.Content>

                <Modal.Actions style={{ background: '#b3bbbf' }}>
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleClose}>
                        <Icon name='send' /> Send Request
                                    </Button>
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleCancel}>
                        <Icon name='cancel' /> Cancel
                                    </Button>
                </Modal.Actions>
            </Modal>

        )
    }
}
