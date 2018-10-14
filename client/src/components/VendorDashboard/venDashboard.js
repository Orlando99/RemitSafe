import React, { Component } from 'react';
import TableDynamic from '../BuyerDashboard/addBuyerTable';
import PropTypes from 'prop-types';
import { checkSession } from '../awshelper';
import { Button, Grid, Container, Card, Segment } from 'semantic-ui-react';
import vendorStore from '../../stores/vendorStore';
import adminStore from '../../stores/adminStore';
import Spinner from '../Spinner';
import HeaderNav from '../Nav/HeaderNav';
import Footer from '../Nav/Footer';
import ConfirmPopUp from '../BuyerDashboard/ConfirmPopUp';
const message='This action cannot be undone. Once you remove this link, this Oraganization will no longer be listed as a Buyer' 
export default class InitRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vendors: [],
            isLoad: false,
            open: false,
            id: 0,
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
                this.loadVendorBuyer();
            }
        });
        vendorStore.addChangeListener(this.onChange);
    }
    componentWillUnmount() {
        vendorStore.removeChangeListener(this.onChange);
    }
    loadVendorBuyer = () => {
        vendorStore.loadVendorsFromBuyer(adminStore.getOraganization().id);
    }
    onChange() {
        this.setState({
            vendors: vendorStore.getBVendors(),
            isLoad: false
        });

    }
    removeAssociation = (e) => {

        this.setState({ open: true, id: e.target.id, removeCompanyName: e.target.getAttribute('data-company') });
    }
    onYesClick = (e) => {
        this.setState({ isLoad: true, open: false });
        vendorStore.unassginVendorBuyer(this.state.id,this.state.removeCompanyName, () => {
            this.loadVendorBuyer();
        });
    };
    onNoClick = (e) => {
        this.setState({ open: false });
    }
    editRemit = (e) => {
        this.context.router.history.push("viewremit");
    }
    addBuyerClick = (e) => {
        this.context.router.history.push("addbuyer");
    }
    render() {

        return (
            <Spinner isLoad={this.state.isLoad}>
                <div>
                    <HeaderNav />
                    <ConfirmPopUp open={this.state.open} message={message} onYesClick={this.onYesClick} onNoClick={this.onNoClick} />
                    <Grid container columns={1}>
                        <Grid.Column width={16}>
                            <Card className="msgbox">
                                <Card.Content >
                                    <Card.Header textAlign="center">My Buyers</Card.Header>
                                    <Card.Description textAlign="center">This is your list of Buyers. &nbsp;These are all the organizations you have added from whom you recieve payments from(they buy from you). &nbsp;
                                        <br/>
                                        <Button
                                            style={{
                                                marginTop: '1%'
                                            }}
                                            className="" color='orange' onClick={this.editRemit} >View How Buyers Pay Me</Button><br />
                                    </Card.Description>
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
                                    <Grid.Row >
                                        <Grid.Column textAlign='Right'>
                                            <h3>Your Buyer List</h3>
                                            <p>Need to add a new Buyer? &nbsp;It's easy, &nbsp;click here: &nbsp; &nbsp; <Button primary onClick={this.addBuyerClick}>Add Buyer</Button>
                                            </p></Grid.Column>
                                    </Grid.Row >

                                    <Grid.Row >
                                        <Container textAlign="left">
                                            <TableDynamic data={this.state.vendors} isBuyer={true} removeAssociation={this.removeAssociation} />
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
