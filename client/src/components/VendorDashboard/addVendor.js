import React from 'react';
import _ from 'lodash';
import {
    Grid,
    Container,
    Card,
    Search
} from 'semantic-ui-react';
import TableDynamic from '../BuyerDashboard/addBuyerTable';
import { checkSession } from '../awshelper';
import adminStore from '../../stores/adminStore';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import HeaderNav from '../Nav/HeaderNav';
import Footer from '../Nav/Footer';
import vendorStore from '../../stores/vendorStore';
import AddVendorRequest from './addVendorRequest';

// Styles
import './index.css';

export default class InitRegistration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vendors: [],
            isLoad: false,
            isLoading: false,
            results: [],
        };
    }

    componentDidMount() {
        const { router } = this.context;
        checkSession((isvalid) => {
            if (isvalid === false) {
                router.history.push('/');
            } else {
                //this.loadOrgenazation(0);
            }
        });
    }

    loadOrgenazation(filterid) {
        adminStore.getOrganization(filterid, false, (allorgs) => {
            if (allorgs != null) {
                const vendors = allorgs;
                this.setState({ vendors, isLoad: false, isLoading: false });
            }
        });
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });
        if (value.length < 1) {
            this.setState({ isLoading: false, results: [] });
        } else {
            vendorStore.searchVendorName(value, (result) => {
                this.setState({ isLoading: false, results: result });
            });
        }
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, vendors: [] });
        this.loadOrgenazation(result.id);
    }

    render() {
        const { isLoading, isLoad, results, value, vendors } = this.state;

        return (
            <Spinner isLoad={isLoad}>
                <div>
                    <HeaderNav />
                    <Grid container columns={1}>
                        <Grid.Column width={16}
                        style={{
                            marginTop: '-26px'
                        }}
                        >
                            <Card className="msgbox">
                                <Card.Content>
                                    <Card.Header textAlign="center">Add Vendor</Card.Header>
                                    <Card.Description textAlign="center">Use the search feature to find existing RemitSafe Vendors. &nbsp;If you can not find one, &nbsp;you can to invite a new Vendor for <strong>RemitSafe</strong> to verify.
                                        <br /><br />
                                        <Search
                                            placeholder="Enter a name, &nbsp;address, &nbsp;or phone"
                                            className="searchcls"
                                            width="300px"
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
                    {/*
                    <Grid container columns={1}>
                        <Grid.Column width={16}>
                            <center>
                                <Card className="searchbox" >
                                    <Card.Content>
                                        <Card.Header >Search Vendor</Card.Header>
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
                            </center>
                        </Grid.Column>
                    </Grid>
                    */}
                    <Grid container columns={1} className="rs-zindex">
                        <Grid.Column>
                            <Grid>
                                <Grid.Row>
                                    <Container>
                                        <TableDynamic data={vendors} isAdd={true} isBuyer={false} />
                                    </Container>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                    <Grid container columns={1}>
                        <Grid.Column width={16} className="marginBottom rs-zindex">
                            <Container textAlign='center'>
                                {this.state.results.length > 0 ? null : <AddVendorRequest isBuyer={false} isFromAdmin={false} />}
                            </Container>
                        </Grid.Column>
                    </Grid>
                    <br /><br />
                    <Footer />
                </div>
            </Spinner>
        );
    }
}

InitRegistration.contextTypes = {
    router: PropTypes.object.isRequired,
};
