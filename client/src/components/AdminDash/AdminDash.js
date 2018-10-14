import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Grid, Container, Card, Icon
} from 'semantic-ui-react';
import loginStore from '../../stores/loginStore';
import adminStore from '../../stores/adminStore';
import { checkSession } from '../awshelper';
import Spinner from '../Spinner';
import HeaderNav from '../Nav/HeaderNav';
import Footer from '../Nav/Footer';

// Style
import './index.css';

export default class InitRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oraganization: {},
            // vendorCount: 0,
            // buyerCount: 0
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { router } = this.context;
        checkSession((isvalid) => {
            if (isvalid === false) {
                router.history.push('/');
            } else {
                this.setState({ isLoad: true });
                loginStore.getUser((dbUser) => {
                    if (dbUser != null) {
                        adminStore.loadOraganization(dbUser.orgid);
                        adminStore.getVendorCountCall(dbUser.orgid);
                        adminStore.getBuyerCountCall(dbUser.orgid);
                    }
                });
            }
        });
        adminStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        adminStore.removeChangeListener(this.onChange);
    }

    onChange() {
        let org = adminStore.getOraganization();
        this.setState({
            oraganization: org != null ? org : {},
            // vendorCount: adminStore.getVendorCount(),
            // buyerCount: adminStore.getBuyerCount(),
            isLoad: false,
        });
    }

    viewCompany = () => {
        const { router } = this.context;
        router.history.push('viewcompany');
    }

    vendorClick = () => {
        const { router } = this.context;
        router.history.push('vendor');
    }

    buyerClick = () => {
        const { router } = this.context;
        router.history.push('buyer');
    }

    vendorAdd = () => {
        const { router } = this.context;
        router.history.push('addvendor');
    }

    buyerAdd = () => {
        const { router } = this.context;
        router.history.push('addbuyer');
    }

    renderCompanyInfo = () => {
        const { oraganization } = this.state;
        return (
            <div className="companydetail">
                <br />
                <span><Icon name="home" size="large" />{oraganization.address1}, &nbsp;</span>
                <span>{oraganization.city}, &nbsp;</span>
                <span>{oraganization.state} &nbsp;</span>
                <span><Icon name="phone" size="large" />{oraganization.phone} &nbsp;</span>
                <Icon name="address card outline" className="pointer custprimary" size="big" onClick={this.viewCompany} />
            </div>
        );
    }

    render() {
        const { isLoad, oraganization } = this.state;

        return (
            <div className="admin-dash">
                <Spinner isLoad={isLoad}>
                    <HeaderNav />
                    <Grid container columns={1}>
                        <Grid.Column width={16}
                        style={{
                            marginTop: '-26px'
                        }}
                        >
                            <Card className="msgbox">
                                <Card.Content>
                                    <Card.Header textAlign="center">Notification</Card.Header>
                                    <Card.Description textAlign="center">
                                        <strong>Welcome to Remitsafe&trade;.</strong>
                                        <br />
                                        Add your vendors and buyers to get started. &nbsp;If you have any questions or need support along the way please contact us at
                                        <a href="mailto:help@remitsafe.net">help@remitsafe.net</a>.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                    <Grid container columns={2}>
                        <Grid.Column computer="8" table="8" mobile="16">
                            <Card className="box">
                                <Card.Content className="box__content">
                                    <Card.Header textAlign="center">My Vendors</Card.Header>
                                    {/* <strong>As a Buyer, &nbsp;you have {this.state.vendorCount} Vendors.</strong><br /><br /> */}
                                    <Card.Description textAlign="center">
                                        In your business, &nbsp;from time to time you buy things from <strong>Vendors</strong>. &nbsp;When you pay these vendors, &nbsp;you are exposed to the possibility of remittance fraud. &nbsp;To prevent this, &nbsp;add your Vendors here so that <strong>RemitSafe</strong> can verify to help secure your payments to these vendors.
                                    </Card.Description>

                                    <Container textAlign="center" className="box__button">
                                        <button type="button" className="ui green right labeled icon button" onClick={this.vendorAdd}>
                                            <i className="right arrow icon" />
                                            Add Vendor
                                        </button>
                                    </Container>
                                </Card.Content>

                                <Card.Content extra>
                                    <Container textAlign="center">
                                        <div className="ui one buttons">
                                            <Button primary textAlign="center" onClick={this.vendorClick}>View My Vendors</Button>
                                        </div>
                                    </Container>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer="8" table="8" mobile="16">
                            <Card className="box">
                                <Card.Content className="box__content">
                                    <Card.Header textAlign="center">My Buyers</Card.Header>
                                    <Card.Description textAlign="center">
                                        {/* <strong>As a Vendor, &nbsp;you have {this.state.buyerCount} Buyers.</strong><br /><br/> */}
                                        In your business, &nbsp;you sell to your <strong>Buyers</strong>. &nbsp;When your Buyers send you payment, &nbsp;you can be exposed to remittance fraud. &nbsp;Add your buyers here so that <strong>RemitSafe</strong> can help verify and notice them to provide correct remittance.
                                    </Card.Description>
                                    <Container textAlign="center" className="box__button">
                                        <button type="button" className="ui green right labeled icon button" onClick={this.buyerAdd}>
                                            <i className="right arrow icon" />
                                            Add Buyer
                                        </button>
                                    </Container>
                                </Card.Content>
                                <Card.Content extra>
                                    <Container textAlign="center">
                                        <div className="ui one buttons">
                                            <Button primary textAlign="center" onClick={this.buyerClick}>View My Buyers</Button>
                                        </div>
                                    </Container>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                    <Grid container columns={1} className="marginBottom">
                        <Grid.Column width={16}>
                            <Card className="companybox">
                                <Card.Content>
                                    <Card.Header textAlign="center">{oraganization.name}</Card.Header>
                                    <Card.Description textAlign="center">
                                        {oraganization !== '' ? this.renderCompanyInfo() : null}
                                    </Card.Description>
                                    <br />
                                </Card.Content>

                            </Card>
                        </Grid.Column>
                    </Grid>
                    <br /><br />
                    <Footer isVerify={true} />
                </Spinner>
            </div>
        );
    }
}

InitRegistration.contextTypes = {
    router: PropTypes.object.isRequired,
};
