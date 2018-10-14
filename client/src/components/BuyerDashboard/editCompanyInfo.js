import React, { Component } from 'react';
import {
    Button, Image, Divider, Grid, Container, Card, Label, Segment, Input
} from 'semantic-ui-react';
import { checkSession } from '../awshelper';
import { Link, Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import adminStore from '../../stores/adminStore';
import buyerStore from '../../stores/buyerStore';
import loginStore from '../../stores/loginStore';
import Spinner from '../Spinner';
import HeaderNav from '../Nav/HeaderNav';
import Footer from '../Nav/Footer';
import CommonFunctions from '../../CommonFunctions';

const stateData = [
    { abbrev: 'AL', name: 'Alabama' },
    { abbrev: 'AK', name: 'Alaska' },
    { abbrev: 'AZ', name: 'Arizona' },
    { abbrev: 'AR', name: 'Arkansas' },
    { abbrev: 'CA', name: 'California' },
    { abbrev: 'CO', name: 'Colorado' },
    { abbrev: 'CT', name: 'Connecticut' },
    { abbrev: 'DE', name: 'Delaware' },
    { abbrev: 'DC', name: 'District Of Columbia' },
    { abbrev: 'FL', name: 'Florida' },
    { abbrev: 'GA', name: 'Georgia' },
    { abbrev: 'HI', name: 'Hawaii' },
    { abbrev: 'ID', name: 'Idaho' },
    { abbrev: 'IL', name: 'Illinois' },
    { abbrev: 'IN', name: 'Indiana' },
    { abbrev: 'IA', name: 'Iowa' },
    { abbrev: 'KS', name: 'Kansas' },
    { abbrev: 'KY', name: 'Kentucky' },
    { abbrev: 'LA', name: 'Louisiana' },
    { abbrev: 'ME', name: 'Maine' },
    { abbrev: 'MD', name: 'Maryland' },
    { abbrev: 'MA', name: 'Massachusetts' },
    { abbrev: 'MI', name: 'Michigan' },
    { abbrev: 'MN', name: 'Minnesota' },
    { abbrev: 'MS', name: 'Mississippi' },
    { abbrev: 'MO', name: 'Missouri' },
    { abbrev: 'MT', name: 'Montana' },
    { abbrev: 'NE', name: 'Nebraska' },
    { abbrev: 'NV', name: 'Nevada' },
    { abbrev: 'NH', name: 'New Hampshire' },
    { abbrev: 'NJ', name: 'New Jersey' },
    { abbrev: 'NM', name: 'New Mexico' },
    { abbrev: 'NY', name: 'New York' },
    { abbrev: 'NC', name: 'North Carolina' },
    { abbrev: 'ND', name: 'North Dakota' },
    { abbrev: 'OH', name: 'Ohio' },
    { abbrev: 'OK', name: 'Oklahoma' },
    { abbrev: 'OR', name: 'Oregon' },
    { abbrev: 'PA', name: 'Pennsylvania' },
    { abbrev: 'RI', name: 'Rhode Island' },
    { abbrev: 'SC', name: 'South Carolina' },
    { abbrev: 'SD', name: 'South Dakota' },
    { abbrev: 'TN', name: 'Tennessee' },
    { abbrev: 'TX', name: 'Texas' },
    { abbrev: 'UT', name: 'Utah' },
    { abbrev: 'VT', name: 'Vermont' },
    { abbrev: 'VA', name: 'Virginia' },
    { abbrev: 'WA', name: 'Washington' },
    { abbrev: 'WV', name: 'West Virginia' },
    { abbrev: 'WI', name: 'Wisconsin' },
    { abbrev: 'WY', name: 'Wyoming' },
];

export default class EditCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            orgid: '',
            isLoad: false,
            remitInfo: '',
            isDirty: false,
            isEdit: false,
        };
    }

    componentDidMount() {
        const { router } = this.context;
        checkSession((isvalid) => {
            if (isvalid === false) {
                router.history.push('/');
            } else {
                const organization = adminStore.getOraganization();
                const isAdmin = loginStore.getUserPermission() === 2;

                this.setState({
                    name: organization.name,
                    address1: organization.address1,
                    address2: organization.address2,
                    city: organization.city,
                    state: organization.state,
                    zip: organization.zip,
                    phone: organization.phone,
                    orgid: organization.id,
                    isAdmin,
                });
                // buyerStore.viewRemitInfo(organization.id, (data) => {
                //     // this.setState({ isLoad: false });
                //     if (data != null) {
                //         this.setState({ remitInfo: data });
                //         console.log('remitInfo ==>', data);
                //     }
                // });
            }
        });

        
    }

    handleChange = (e) => {
        const newState = this.state;
        newState[e.target.name] = e.target.value;
        newState.isDirty = true;
        this.setState(newState);
    }

    handleSave = (e) => {
        const { zip, name, address1, address2, city, state, phone, orgid } = this.state;
        if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)) {
            this.setState({ isLoad: true });
            const data = {
                name,
                address1,
                address2,
                city,
                country: 'US',
                state,
                zip,
                phone,
                orgid,
            };
            adminStore.saveOraganization(data, () => {
                toastr.success('success');
                this.setState({ isLoad: false, isDirty: false });
                // this.context.router.history.push('/admin');
            });
        } else {
            toastr.error('zip is invalid');
        }

    }

    onEditRemit = () => {
        const { router } = this.context;
        router.history.push('/admin');
    }

    render() {
        const { phone, isLoad, name, address1, address2, city, state, zip, isEdit, isAdmin } = this.state;
        const phoneArea = phone.substring(0, 3);
        const phoneSecond = phone.substring(3, 6);
        const phoneThird = phone.substring(6, 10);
       

        return (
            <Spinner isLoad={isLoad}>
                <div>
                    <HeaderNav />
                    <Grid container columns={1}>
                        <Grid.Column width={16}>
                            <Card className="msgbox">
                                <Card.Content textAlign="center">
                                    <Card.Header textAlign="center" style={{ fontSize: '20px' }}>
                                        Company Profile Information
                                    </Card.Header>
                                    <Card.Description textAlign="center">
                                        <p>To make a change to any of this information, please click "Request Update" which will open up an email to our team at help@remitsafe.net. Please detail what changes need to be made and our team will assist you and verify the changes.</p>
                                    </Card.Description>
                                    <Button
                                        // href="mailto:help@remitsafe.net?Subject=RemitSafe%20Profile%20Update"
                                        disabled={!isAdmin}
                                        onClick={() => this.setState({ isEdit: true })}
                                        style={{ background: '#f0712d', color: 'snow', textAlign: 'center', margin: '1% 1% 0 1%' }}
                                    >
                                        Request Update
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>

                    <Grid container columns={1}>
                        {/** Todo | This will be removed after determin the input format */}
                        <Grid.Column width={16} style={{ display: 'none' }}>
                            <div
                                className="ui form attached fluid segment"
                                style={{
                                    borderRadius: '5px',
                                    border: 'none',
                                    marginBottom: '0!important',
                                }}
                            >
                                <div className="one fields">
                                    <label className="paymentInfo" style={{ fontSize: '18px' }}>Company Information</label>
                                </div>
                                <p style={{ fontSize: 'small', color: 'rgb(0,0,0,.68)' }}>
                                    The Company Information below will be visible to the 
                                    following verified parties attempting to link to link to your RemitSafe record:
                                    <strong> Buyers, Vendors, and Users</strong>
                                </p>
                                <div className="one fields">
                                    <div className="field width100">

                                        <label>
                                            <span className="editCompanyLabel">Company Name</span>: &nbsp;&nbsp;&nbsp;
                                            <span className="fontWeightAdjust">
                                                {/* <Input
                                                    placeholder="Enter your company name"
                                                    type="name"
                                                    name="name"
                                                    value={name}
                                                    onChange={this.handleChange}
                                                /> */}
                                                {name}
                                            </span>
                                        </label>
                                        {/* <Input
                                            placeholder="Enter your company name"
                                            type="name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        /> */}

                                    </div>
                                </div>
                                <div className="one fields">
                                    <div className="field width100">
                                        <label>
                                            <span className="editCompanyLabel">Street Address 1</span>: &nbsp;&nbsp;&nbsp;
                                            <span className="fontWeightAdjust">{address1}</span>
                                        </label>
                                        {/* <Input
                                            placeholder="Enter your street address"
                                            type="name"
                                            name="address1"
                                            value={this.state.address1}
                                            onChange={this.handleChange}
                                       /> */}
                                    </div>
                                </div>
                                <div className="one fields">
                                    <div className="field width100">
                                        <label>
                                            <span className="editCompanyLabel">Street Address 2</span>: &nbsp;&nbsp;&nbsp;
                                            <span className="fontWeightAdjust">{address2}</span>
                                        </label>
                                        {/* <Input
                                            placeholder="Enter your street address"
                                            type="name"
                                            name="address2"
                                            value={this.state.address2}
                                            onChange={this.handleChange}
                                        /> */}
                                    </div>
                                </div>

                                <div className="three fields marginBottomFix">
                                    <div className="field width100">
                                        <label>
                                            <span className="editCompanyLabel">City</span>: &nbsp;&nbsp;&nbsp;
                                            <span className="fontWeightAdjust">{city}</span>
                                        </label>
                                        {/* <Input
                                            placeholder="Enter your street address"
                                            type="name"
                                            name="city"
                                            value={this.state.city}
                                            onChange={this.handleChange}
                                        /> */}
                                    </div>

                                    <div className="one fields">
                                        <div className="field width100">
                                            <label>
                                                <span className="editCompanyLabel">State</span>: &nbsp;&nbsp;&nbsp;
                                                <span className="fontWeightAdjust">{state}</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="one fields">
                                        <div className="field width100">
                                            <label>
                                                <span className="editCompanyLabel">Zip</span>: &nbsp;&nbsp;&nbsp;
                                                <span className="fontWeightAdjust">{zip}</span>
                                            </label>
                                            {/* <Input
                                                placeholder="Enter your street address"
                                                type="name"
                                                name="zip"
                                                value={this.state.zip}
                                                onChange={this.handleChange}
                                            /> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="one fields">
                                    <div className="field width100">
                                        <label>
                                            <span className="editCompanyLabel">Phone</span>: &nbsp;&nbsp;&nbsp;
                                            <span className="fontWeightAdjust">
                                                {/*{this.state.phone}*/}
                                                ({phoneArea}) - {phoneSecond} - {phoneThird}
                                            </span>
                                        </label>
                                        {/* <Input
                                            placeholder="Enter your phone"
                                            type="name"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleChange}
                                       />*/}
                                    </div>
                                </div>

                                <div className="one fields">
                                    <Container textAlign="right">
                                        {/*<Button primary onClick={this.handleSave}>Save</Button> */}
                                    </Container>
                                </div>
                            </div>
                        </Grid.Column>

                        <Grid.Column width={16} className="marginBottom20">
                            <div className="ui form attached fluid segment" style={{ borderRadius: '5px', border: '0' }}>
                                <div className="one fields">
                                    <label className="paymentInfo" style={{ fontSize: '18px' }}>Company Information</label>
                                </div>
                                <p style={{ fontSize: 'small', color: 'rgb(0,0,0,.68)' }}>
                                    The Company Information below will be visible to the
                                    following verified parties attempting to link to link to your RemitSafe record:
                                    <strong> Buyers, Vendors, and Users</strong>
                                </p>
                                <div className="one fields">
                                    <div className="field width100">
                                        <label>Company Name</label>
                                        <Input
                                            placeholder="Enter your company name"
                                            type="name"
                                            name="name"
                                            disabled={!isEdit}
                                            value={name}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="one fields">
                                    <div className="field width100">
                                        <label>Street Address 1</label>
                                        <Input
                                            placeholder="Enter your street address1"
                                            type="name"
                                            name="address1"
                                            disabled={!isEdit}
                                            value={address1}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="one fields">
                                    <div className="field width100">
                                        <label>Street Address 2</label>
                                        <Input
                                            placeholder="Enter your street address2"
                                            type="name"
                                            name="address2"
                                            disabled={!isEdit}
                                            value={address2}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="three fields">
                                    <div className="field width100">
                                        <label>City</label>
                                        <Input
                                            placeholder="Enter your city"
                                            type="name"
                                            name="city"
                                            disabled={!isEdit}
                                            value={city}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="field width100">
                                        <label>State</label>
                                        {/* <Input
                                            placeholder="Enter your state"
                                            name="state"
                                            value={state}
                                            readOnly={!isEdit}
                                            onChange={this.handleChange}
                                        /> */}
                                        <select
                                            required="true"
                                            name="state"
                                            className="ui fluid dropdown"
                                            value={state} onChange={this.handleChange}
                                            disabled={!isEdit}
                                        >
                                            {stateData.map(stateItem => (
                                                <option key={stateItem.name} value={stateItem.abbrev}>{stateItem.name}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="field width100">
                                        <label>Zip</label>
                                        <Input
                                            placeholder="Enter your Zipcode"
                                            type="name"
                                            name="zip"
                                            disabled={!isEdit}
                                            value={zip}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="one fields">
                                    <div className="field width100">
                                        <label>Phone</label>
                                        <Input
                                            placeholder="Enter your phone number"
                                            type="name"
                                            name="phone"
                                            disabled={!isEdit}
                                            value={isEdit ? phone : `(${phoneArea}) - ${phoneSecond} - ${phoneThird}`}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                {
                                    isEdit && (
                                        <div className="one fields">
                                            <Container textAlign="center" className="mt-20">
                                                <Button primary onClick={this.handleSave}>Send Request</Button>
                                            </Container>
                                        </div>
                                    )
                                }
                            </div>
                        </Grid.Column>
                    </Grid>

                    <Footer />
                </div>
            </Spinner>
        );
    }
}

EditCompany.contextTypes = {
    router: PropTypes.object.isRequired,
};
