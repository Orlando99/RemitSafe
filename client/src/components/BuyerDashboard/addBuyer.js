import React, { Component } from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import { createBut, deleteVenBut, editVenBut } from "../helpers";
// import TableDynamic from '../BuyerDashboard/table';
import TableDynamic from '../BuyerDashboard/addBuyerTable';
import {
    Button,
    Image,
    Divider,
    Grid,
    Container,
    Card,
    Label,
    Segment,
    Search,
    Modal,
    Icon, Header, Input
} from 'semantic-ui-react';
import { checkSession } from '../awshelper';
import loginStore from '../../stores/loginStore';
import adminStore from '../../stores/adminStore'
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import HeaderNav from '../Nav/HeaderNav';
import Footer from '../Nav/Footer'
import vendorStore from '../../stores/vendorStore';
import AddVendorRequest from '../VendorDashboard/addVendorRequest';
var imgSrc = require('../../assets/images/RemitSafe-logo-dark_small-transparent.png');
var vendor = require('../../assets/images/vendor.png');
export default class InitRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyers: [],
            isLoad: false,
            isLoading: false,
            results: []
        };
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        if (value.length < 1) {
            this.setState({ isLoading: false, results: [] });
        }
        else {
            vendorStore.searchVendorName(value, (result) => {
                this.setState({ isLoading: false, results: result })
            })
        }


    }
    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, buyers: [] });
        this.loadOrgenazation(result.id);
    }
    componentDidMount() {
        checkSession((isvalid) => {
            if (isvalid == false) {
                this.context.router.history.push("/");
            }
            else {
                // this.setState({ isLoad: true });
                var orgid = loginStore.getDbUser();
                // this.loadOrgenazation(0);
            }
        });
    }
    loadOrgenazation(filterid) {
        var orgid = loginStore.getDbUser();
        adminStore.getOrganization(filterid, true, (allorgs) => {
            if (allorgs != null) {
                this.state.buyers = allorgs;
                this.setState({ buyers: this.state.buyers, isLoad: false, isLoading: false });
            }
        });
    }
    render() {
        const { isLoading, results, value } = this.state
        return (
            <Spinner isLoad={this.state.isLoad} >
                <div>
                    <HeaderNav />
                    <Grid container columns={1}>
                        <Grid.Column width={16}
                         style={{
                            marginTop: '-26px'
                        }}
                        >
                            <Card className="msgbox" >
                                <Card.Content>
                                    <Card.Header textAlign="center">Add Buyer</Card.Header>
                                    <Card.Description textAlign="center">Use the search feature to find existing RemitSafe Verified Buyers. &nbsp;If you can not find one, &nbsp;you can invite a new Buyer for <strong>RemitSafe</strong> to verify.
                                        <br /><br />
                                        <Search
                                            placeholder="Enter a name, &nbsp;address, &nbsp;or phone"
                                            size="big"
                                            className="searchcls"
                                            results={results}
                                            value={value}
                                            loading={isLoading}
                                            onResultSelect={this.handleResultSelect}
                                            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                            {...this.props}
                                        />
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                    {/*<Grid container columns={1}>
                        <Grid.Column width={16}>
                            <Card className="msgbox" >
                                <Card.Content>
                                    <Card.Header >Search Buyer</Card.Header>
                                    <Card.Description>
                                        <Search
                                            defaultValue=""
                                            size="big"
                                            results={results}
                                            value={value}
                                            loading={isLoading}
                                            onResultSelect={this.handleResultSelect}
                                            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                            {...this.props}
                                        />
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                    */}
                    <Grid container columns={1} className="rs-zindex">
                        <Grid.Column >
                            <Grid>
                                <Grid.Row >
                                    <Container >
                                        <TableDynamic data={this.state.buyers} isAdd={true} isBuyer={true} />
                                    </Container>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                    <Grid container columns={1}>
                        <Grid.Column width={16} className="marginBottom rs-zindex">
                            <Container textAlign='center'>
                                {this.state.results.length > 0 ? null : <AddVendorRequest isBuyer={true} isFromAdmin={false} />}
                            </Container>
                        </Grid.Column>
                    </Grid>
                    <br /><br />
                    <Footer />
                </div>
            </Spinner>
        )
    }
}
InitRegistration.contextTypes = {
    router: PropTypes.object.isRequired
};