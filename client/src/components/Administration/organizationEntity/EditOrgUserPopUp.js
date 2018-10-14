import React, { Component } from 'react'
import { Button, Input, Icon, Divider, Modal, Header, Dropdown } from 'semantic-ui-react'
import CommonFunctions from '../../../CommonFunctions';
import Spinner from '../../Spinner';
import toastr from 'toastr';
//Stores
import loginStore from '../../../stores/loginStore';
import logStore from '../../../stores/logStore';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import userStore from '../../../stores/userStore';

export default class EditOrgUserPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            firstname: '',
            lastname: '',
            isverified: false,
            permission: '',
            usertype: '',
            userid: 0
        };
    }


    handleSave = (e) => {
        this.setState({ isLoad: true });
        let data = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            nowverify: this.state.isverified,
            usertype: this.state.usertype,
            id: this.state.userid
        }
        loginStore.upateUser(data, (re) => {
            this.setState({ isLoad: false, open: false });
            if (re != null) {
                toastr.success('user updated successfully');
                userStore.loadUserByOrgId(this.props.orgid);
                this.setState({ open: false });
                let logdata = {
                    action: 'User Changed',
                    detail: 'User profile has been changed by admin'
                }
                logStore.logEvents(logdata);
            }
        });

    }
    handleChange = (e) => {
        const newState = this.state;
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    onToggle = (e, data) => {
        this.setState({ isverified: data.checked });
    }
    handleOpen = (e) => {
        this.setState({ open: true, isLoad: true });
        loginStore.getUserById(e.target.id, (result) => {
            let data = {
            }
            if (result != null) {
                data = {
                    isLoad: false,
                    firstname: result.firstName,
                    lastname: result.lastName,
                    isverified: result.nowverify === 1 ? true : false,
                    permission: result.permission,
                    usertype: result.usertype,
                    userid: result.id
                }

            }
            else {
                data = {
                    isLoad: false
                }
            }
            this.setState(data);
        })
    }
    onUserTypeChange = (e, data) => {
        this.setState({ usertype: data.value });
    }
    handleCancel = (e) => {
        this.setState({ open: false });
    }
    render() {

        return (
            <Modal trigger={<Icon size="large" color="blue" className="pointer" id={this.props.id} onClick={this.handleOpen} name='edit' />}
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
                                    htmlFor={'companyName'}>First Name</label>
                                <div className="field">
                                    <Input required="true"
                                  
                                        style={{ paddingBottom: 10 }}
                                        type="text" name="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label>Last Name</label>
                                <Input required="true" type="text"
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={this.handleChange}
                                    placeholder="Last Name" />
                            </div>
                            <div className="field">
                                <label>Verified</label>
                                <Checkbox toggle onChange={this.onToggle} checked={this.state.isverified} />
                            </div>
                            <div className="field">
                                <label>User Type</label>
                                <Dropdown
                                    placeholder='Select User Type'
                                    selection
                                    value={this.state.usertype}
                                    onChange={this.onUserTypeChange}
                                    options={CommonFunctions.getUserTypeOptions()} />
                            </div>
                            <br />

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