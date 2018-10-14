import React, { Component } from 'react';
import { Button, Image, Divider, Grid, Container, Card, Label, Segment, Input, Icon } from 'semantic-ui-react';
import { checkSession } from '../../awshelper';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import adminStore from '../../../stores/adminStore';
import remitStore from '../../../stores/remitStore';
import logStore from '../../../stores/logStore';
import Spinner from '../../Spinner';
import toastr from 'toastr';
import CommonFunctions from '../../../CommonFunctions';

export default class EditRemitInfoAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            add1: '',
            add2: '',
            city: '',
            state: '',
            zip: '',
            orgid: '',
            cname: '',
            bname: '',
            routingno: '',
            routingnoDisp: '',
            accountnoDisp: '',
            accountno: '',
            isLoad: false,
            isUpdate: false
        }
    }
    componentDidMount() {
        checkSession((isvalid) => {
            if (isvalid == false) {
                this.context.router.history.push("/");
            }
            else {
                this.setState({ isLoad: true });
                if(this.props.match.params.remitid) {
                    remitStore.getRemitBankInfoById(this.props.match.params.remitid, (remitInfo) => {
                        if (remitInfo != null) {
                            this.setState({
                                remitid: remitInfo.id,
                                name: remitInfo.name,
                                add1: remitInfo.address1,
                                add2: remitInfo.address2,
                                city: remitInfo.city,
                                state: remitInfo.state,
                                zip: remitInfo.zip,
                                orgid: remitInfo.orgid,
                                cname: remitInfo.companyname,
                                approve: remitInfo.approve,
                                defaultmethod: remitInfo.defaultmethod,
                                bname: remitInfo.bankname,
                                routingno: remitInfo.routingnumber,
                                routingnoDisp: CommonFunctions.getEncryptRoutingNo(remitInfo.routingnumber),
                                accountno: remitInfo.accountnumber,
                                accountnoDisp: CommonFunctions.getEncryptAccountNo(remitInfo.accountnumber),
                                isLoad: false,
                                isUpdate: true
                            });
                        }
                        else {
                            this.setState({ isLoad: false });
                        }
                    });
                }
            }
        });

    }
    handleChange = (e) => {
        const newState = this.state;
        if (e.target.name == "accountno") {
            newState["accountnoDisp"] = e.target.value;
        }
        else if (e.target.name == "routingno") {
            newState["routingnoDisp"] = e.target.value;
        }
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }
    updateRemitBankInfo = (e) => {
        if (this.state.name != '' && this.state.add1 != '' && this.validateBankInfo()) {
            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip)) {
                this.setState({ isLoad: true });
                var data = {
                    id: this.state.remitid,
                    name: this.state.name,
                    address1: this.state.add1,
                    address2: this.state.add2,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    orgid: this.state.orgid,
                    bankname: this.state.bname,
                    accountnumber: this.state.accountno,
                    routingnumber: this.state.routingno,
                    defaultmethod: this.state.defaultmethod,
                    companyname: this.state.cname,
                    approve: this.state.approve
                }
                if(this.props.match.params.remitid == 0) {
                    var organization = adminStore.getOraganization();
                    data.orgid = organization.id;

                    remitStore.addUpdateRemitInfo(data, () => {
                        toastr.success('Remit Info Save/Update Successfully');
                        this.setState({ isLoad: false });
                        let logData = {
                            action: 'Remit add Request',
                            detail: CommonFunctions.getUserName() + (this.state.isUpdate ? ' request a change from remit information' : ' added a remit information')
                        }
                        logStore.logEvents(logData);
                        this.props.history.goBack();
                    });
                } else {
                    remitStore.updateRemitInfos(data, () => {
                        toastr.success('Remit Info Save/Update Successfully');
                        this.setState({ isLoad: false });
                        let logData = {
                            action: 'Remit Change Request',
                            detail: CommonFunctions.getUserName() + (this.state.isUpdate ? ' request a change from remit information' : ' added a remit information')
                        }
                        logStore.logEvents(logData);
                        this.props.history.goBack();
                    });
                }
            }
            else {
                toastr.error("zip is invalid");
            }
        }
        else {
            toastr.error("please enter the require information !");
        }
    }
    addUpdateBankInfo = (e) => {
        var organization = adminStore.getOraganization();
        var data = {
            companyname: this.state.cname,
            name: this.state.bname,
            accountnumber: this.state.accountno,
            routingnumber: this.state.routingno,
            orgid: organization.id
        }

        if (this.validateBankInfo()) {
            this.setState({ isLoad: true });
            remitStore.addUpdateBankInfo(data, () => {
                toastr.success('Bank Info Save/Update Successfully');
                this.setState({
                    isLoad: false,
                    routingnoDisp: CommonFunctions.getEncryptRoutingNo(this.state.routingno),
                    accountnoDisp: CommonFunctions.getEncryptAccountNo(this.state.accountno)
                });
            })
        }
    }
    validateBankInfo() {
        return CommonFunctions.validateAccountNumber(this.state.accountno)
            && CommonFunctions.validateRoutingNumber(this.state.routingno);
    }
    render() {

        return (
            <Spinner isLoad={this.state.isLoad}>
                <Grid container columns={1} >
                    <Grid.Column width={16}>
                        <Card className="msgbox"
                            style={{
                                marginBottom: '-3%'
                            }}
                        >
                            <Card.Content textAlign='center'>
                                <Card.Header textAlign="center">Your Remittance Information</Card.Header>
                                <Card.Description textAlign="center">Once you request to update your remittance information, <strong>RemitSafe</strong> will verify.</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>


                <Grid container columns={2}
                    style={{
                        marginBottom: '-11%'
                    }}
                >
                    <Grid.Column width={9} className="marginBottom150">
                        <div className="ui form attached fluid segment"
                            style={{
                                borderRadius: '5px',
                                border: '0'
                            }}
                        >
                            <div className="one fields">
                                <label className="paymentInfo">Payment Address Information</label>
                            </div>
                            <div className="one fields">
                                <div className="field width100">
                                    <label>Company Name</label>
                                    <Input
                                        placeholder="Enter your company name"
                                        type="name"
                                        name="name"

                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="one fields">
                                <div className="field width100">
                                    <label>Street Address 1</label>
                                    <Input
                                        placeholder="Enter your street address"
                                        type="name"
                                        name="add1"

                                        value={this.state.add1}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="one fields">
                                <div className="field width100">
                                    <label>Street Address 2</label>
                                    <Input
                                        placeholder="Enter your street address"
                                        type="name"
                                        name="add2"

                                        value={this.state.add2}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="three fields">
                                <div className="field width100">
                                    <label>City</label>
                                    <Input
                                        placeholder="Enter your street address"
                                        type="name"
                                        name="city"

                                        value={this.state.city}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="field width100">
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
                                <div className="field width100">
                                    <label>Zip</label>
                                    <Input
                                        placeholder="Enter your street address"
                                        type="name"
                                        name="zip"

                                        value={this.state.zip}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="one fields">
                                <Container textAlign="right">
                                    <br /><br />
                                </Container>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={7}
                    >
                        <div className="ui form attached fluid segment"
                            style={{
                                borderRadius: '5px',
                                border: '0'
                            }}
                        >
                            <div className="one fields">
                                <label className="paymentInfo">Bank Remittance Information</label>
                            </div>
                            <div className="one fields">
                                <div className="field width100">
                                    <label>Company Name</label>
                                    <Input
                                        placeholder="Enter  your company Name"
                                        type="name"
                                        name="cname"
                                        value={this.state.cname}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="one fields">
                                <div className="field width100">
                                    <label>Name</label>
                                    <Input
                                        placeholder="Enter your Bank Name"
                                        type="name"
                                        name="bname"

                                        value={this.state.bname}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="one fields">
                                <div className="field width100">
                                    <label>RoutingNo</label>
                                    <Input
                                        placeholder="Enter your routingNo"
                                        type="name"
                                        name="routingno"

                                        value={this.state.routingnoDisp}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="one fields">
                                <div className="field width100">
                                    <label>AccountNo</label>
                                    <Input
                                        placeholder="Enter your accountNo"
                                        type="name"
                                        name="accountno"

                                        value={this.state.accountnoDisp}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="one fields">
                                <Container textAlign="right">
                                    <br /><br />
                                </Container>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
                <Container textAlign="center" className="marginBottom20">
                    <Button primary onClick={this.updateRemitBankInfo}>Save</Button>
                </Container>
            </Spinner>
        )
    }
}
EditRemitInfoAdmin.contextTypes = {
    router: PropTypes.object.isRequired
};
