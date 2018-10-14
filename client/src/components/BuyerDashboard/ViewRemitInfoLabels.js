import React, { Component } from 'react';
import { Button, Image, Divider, Grid, Container, Card, Label, Segment, Input, Icon } from 'semantic-ui-react';
import moment from 'moment'
import { checkSession } from '../awshelper';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderNav from '../Nav/HeaderNav'
import Footer from '../Nav/Footer';
import adminStore from '../../stores/adminStore';
import remitStore from '../../stores/remitStore';
import logStore from '../../stores/logStore';
import loginStore from '../../stores/loginStore';
import Spinner from '../Spinner';
import toastr from 'toastr';
import CommonFunctions from '../../CommonFunctions';
var imgSrc = require('../../assets/images/RemitSafe-logo-dark_small-transparent.png');

export default class EditRemit extends Component {

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
            isUpdate: false,
            isAdmin: false
        }
    }
    componentDidMount() {
        checkSession((isvalid) => {
            if (isvalid == false) {
                this.context.router.history.push("/");
            }
            else {
                const isAdmin = loginStore.getUserPermission() === 2;
                this.setState({ isLoad: true, isAdmin: isAdmin });
                var organization = adminStore.getOraganization();

                remitStore.getRemitBankInfo(organization.id, (remitInfo) => {
                    if (remitInfo != null) {
                        this.setState({
                            name: remitInfo.name,
                            add1: remitInfo.address1,
                            add2: remitInfo.address2,
                            city: remitInfo.city,
                            state: remitInfo.state,
                            zip: remitInfo.zip,
                            approve: remitInfo.approve,
                            cname: remitInfo.companyname,
                            bname: remitInfo.bankname,
                            routingno: remitInfo.routingnumber,
                            routingnoDisp: CommonFunctions.getEncryptRoutingNo(remitInfo.routingnumber),
                            accountno: remitInfo.accountnumber,
                            accountnoDisp: CommonFunctions.getEncryptAccountNo(remitInfo.accountnumber),
                            isLoad: false,
                            isUpdate: true,
                            createdat: remitInfo.createdAt,
                            updatedat: remitInfo.updatedAt
                        });
                    }
                    else {
                        this.setState({ isLoad: false });
                    }

                });
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
    addUpdateRemitBankInfo = (e) => {
        var organization = adminStore.getOraganization();
        if (this.state.name != '' && this.state.add1 != '' && this.validateBankInfo()) {
            if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip)) {
                this.setState({ isLoad: true });
                var data = {
                    name: this.state.name,
                    address1: this.state.add1,
                    address2: this.state.add2,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    orgid: organization.id,
                    bankname: this.state.bname,
                    accountnumber: this.state.accountno,
                    routingnumber: this.state.routingno,
                    companyname: this.state.cname
                }
                remitStore.addUpdateRemitInfo(data, () => {
                    toastr.success('Remit Info Save/Update Successfully');
                    this.setState({ isLoad: false });

                    let logData = {
                        action: 'Remit Change Request',
                        detail: CommonFunctions.getUserName() + (this.state.isUpdate ? ' request a change from remit information' : ' added a remit information')
                    }
                    logStore.logEvents(logData);
                })
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
    editRemittance = (e) => {
        this.context.router.history.push("editremit");
    }
    render() {

        return (
            <Spinner isLoad={this.state.isLoad}>
                <HeaderNav />
                <Grid container columns={1} >
                    <Grid.Column width={16}>
                        <Card className="msgbox"
                            style={{
                                marginBottom: '-3%'
                            }}
                        >
                            <Card.Content textAlign='center'>
                                <Card.Header textAlign="center">Your Remittance Information</Card.Header>
                                <Card.Description textAlign="center">
                                    Here is your most up to date remittance Information.
                                    <br />
                                    If the information below is incorrect or has changed,
                                    you can request to update your Remittance here <br />
                                    <div className="flexSection">
                                        <div className="inlineSection infoSection">
                                            <span className="infoTitle">Created Date:</span> {moment(this.state.createdat).utc().format('MM/DD/YYYY')} &nbsp;&nbsp; <span className="infoTitle">Updated Date:</span> {moment(this.state.updatedat).utc().format('MM/DD/YYYY')}
                                        </div>
                                        <div className="inlineSection">
                                            <Button
                                                disabled={!this.state.isAdmin}
                                                onClick={this.editRemittance}
                                                style={{
                                                    background: '#f0712d',
                                                    color: 'snow',
                                                    textAlign: 'center',
                                                    margin: '1%',
                                                    marginBottom: '0'
                                                }}
                                            >Request to Update
                                            </Button>
                                        </div>
                                        <div className="inlineSection">
                                            {this.state.approve ?
                                                <Button basic disabled color="green">Verified</Button> :
                                                <Button basic disabled color="yellow">Pending</Button>}

                                        </div>

                                    </div>
                                </Card.Description>
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
                                        readOnly
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
                                        readOnly
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
                                        readOnly
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
                                        readOnly
                                        value={this.state.city}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="field width100">
                                    <label>State</label>
                                    <Input
                                        name='state'
                                        value={this.state.state}
                                        readOnly
                                    />

                                </div>
                                <div className="field width100">
                                    <label>Zip</label>
                                    <Input
                                        placeholder="Enter your street address"
                                        type="name"
                                        name="zip"
                                        readOnly
                                        value={this.state.zip}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="one fields">
                                <Container textAlign="right">
                                    <br /><br />
                                    {/*<Button animated style={{ marginTop: '-4%', background: '#3b5998' }}*/}
                                    {/*className="ui right floated primary button" primary onClick={this.addUpdateRemitInfo}>*/}
                                    {/*<Button.Content visible>*/}
                                    {/*<Link style={{ color: '#FFF' }} primary to='#' >  <span>Edit</span></Link>*/}
                                    {/*</Button.Content>*/}
                                    {/*<Button.Content hidden>*/}
                                    {/*<Icon name='right arrow' />*/}
                                    {/*</Button.Content>*/}
                                    {/*</Button>*/}
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
                                        readOnly
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
                                        readOnly
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
                                        readOnly
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
                                        readOnly
                                        value={this.state.accountnoDisp}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="one fields">
                                <Container textAlign="right">
                                    <br /><br />
                                    {/*<Button animated style={{ marginTop: '-4%', background: '#3b5998' }}*/}
                                    {/*className="ui right floated primary button" primary onClick={this.addUpdateBankInfo}>*/}
                                    {/*<Button.Content visible>*/}
                                    {/*<Link style={{ color: '#FFF' }} primary to='#' > <span>Edit</span></Link>*/}
                                    {/*</Button.Content>*/}
                                    {/*<Button.Content hidden>*/}
                                    {/*<Icon name='right arrow' />*/}
                                    {/*</Button.Content>*/}
                                    {/*</Button>*/}
                                </Container>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>

                <Footer
                    style={{
                        zIndex: '2'
                    }}
                />
            </Spinner>
        )
    }
}
EditRemit.contextTypes = {
    router: PropTypes.object.isRequired
};
