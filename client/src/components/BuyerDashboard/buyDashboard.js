import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkSession } from '../awshelper';
import TableDynamic from '../BuyerDashboard/table';
import { Button, Grid, Container, Card, Segment } from 'semantic-ui-react';
import adminStore from '../../stores/adminStore';
import buyerStore from '../../stores/buyerStore';
import Spinner from '../Spinner';
import HeaderNav from '../Nav/HeaderNav'
import Footer from '../Nav/Footer'
import vendorStore from '../../stores/vendorStore';
import ConfirmPopUp from '../BuyerDashboard/ConfirmPopUp';
const message='This action cannot be undone. Once you remove this link, this Oraganization will no longer be listed as a Vendor'
export default class InitRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyers: [],
            open: false,
            id: 0,
            isLoad: false,
            removeCompanyName: ''
        };
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        checkSession((isvalid) => {
            if (isvalid === false) {
                this.context.router.history.push("/");
            }
            else {
                this.setState({ isLoad: true });
                this.loadVBuyer();
            }
        });
        buyerStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        buyerStore.removeChangeListener(this.onChange);
    }
    onChange() {
        this.setState({
            buyers: buyerStore.getvBuyer(),
            isLoad: false
        });
    }
    addVendor = (e) => {
        this.context.router.history.push("addvendor");
    }
    loadVBuyer = () => {
        buyerStore.loadBuyerFromVendors(adminStore.getOraganization().id);
    }
    removeAssociation = (e) => {
        let test=e.target.getAttribute('data-company');
        this.setState({ open: true, id: e.target.id, removeCompanyName: e.target.getAttribute('data-company') });
    }
    onYesClick = (e) => {
        this.setState({ isLoad: true, open: false });
        vendorStore.unassginVendorBuyer(this.state.id, this.state.removeCompanyName, () => {
            this.loadVBuyer();
        });
    };
    onNoClick = (e) => {
        this.setState({ open: false });
    }
    render() {
      
        return (
            <Spinner isLoad={this.state.isLoad}>
                <div>
                    <HeaderNav />
                    <ConfirmPopUp open={this.state.open} message={message} onYesClick={this.onYesClick} onNoClick={this.onNoClick} />
                    <Grid container columns={1}>
                        <Grid.Column width={16}>
                            <Card className="msgbox" >
                                <Card.Content>
                                    <Card.Header textAlign="center">My Vendors</Card.Header>
                                    <Card.Description textAlign="center">The list below displays your Vendors (organizations you pay for goods or services). &nbsp;If you want to add a new Vendor, &nbsp;please search below. &nbsp;You can add as many Vendors as you want. &nbsp;Once the Vendor is verified by <strong>RemitSafe</strong>, &nbsp;their status will change from Pending to Verified.</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                    <Grid container columns={1} className="marginBottom">
                        <Grid.Column >
                            <Segment
                                style={{
                                    marginTop: '3%',
                                    marginBottom: '2%'
                                }}
                            >
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column textAlign='Right'>
                                            <h3>Your Vendor List</h3>
                                            <p>Need to add a new Vendor? &nbsp;It's easy, &nbsp;click here: &nbsp; &nbsp; <Button primary onClick={this.addVendor}>Add Vendor</Button>
                                            </p></Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row >
                                        <Container textAlign="left">
                                            <TableDynamic data={this.state.buyers} isBuyer={false} removeAssociation={this.removeAssociation} />
                                        </Container>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <br />
                    <Footer />
                </div>
            </Spinner>
        )
    }
}
InitRegistration.contextTypes = {
    router: PropTypes.object.isRequired
};
