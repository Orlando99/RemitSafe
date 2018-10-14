import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';

// Components
import Navbar from '../adminNav/Navbar';
import OrganizationsNameHead from './OrganizationsNameHead';
import Sidebar from './Sidebar';
import LinksTable from './LinksTable';
import AddBuyerVendorPopUp from './AddBuyerVendorPopUp';


//Stores
import oraganizationStore from '../../../stores/oraganizationStore';
import vendorStore from '../../../stores/vendorStore';
export default class BuyerVendorLinksBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentorg: oraganizationStore.getOraganizationForHeader(),
            data: [],
            isBuyer: false,
            open: false
        }

    }
    componentDidMount() {
        this.loadVendorBuyerLinks();
    }
    loadVendorBuyerLinks() {
        this.setState({ isLoad: true, open: false })
        vendorStore.getVenBuyLinksByOrg(this.state.currentorg.id, (data) => {
            this.state.data = data;
            this.setState({
                isLoad: false,
                data: [...this.state.data]
            })
        });
    }
    componentWillReceiveProps(){
        this.setState({open:false});
    }
    AddBuyerVendor = (e) => {

        if (e.target.id == "buyer") {
            this.state.isBuyer = true;
        }
        else {
            this.state.isBuyer = false;
        }
        this.setState({ open: true });
    }

    render() {
        return (
            <div className='gridColumnAliign'>
                <Navbar isHome={false} isUser={false} isOrg={true} />
                <OrganizationsNameHead name={this.state.currentorg.name} />
                <Grid columns={2} className='entityMarginsFix'>
                    <Grid.Column width={4}>
                        <Sidebar id={this.props.match.params.id} />
                    </Grid.Column>
                    <Grid.Column width={12} className='' >
                        <Card className='infoBoxStyle'>
                            <Card.Content>

                                {/* Pass in Values from DB below */}
                                {/* Should be Editbable */}

                                <Card.Header>
                                    Buyer and Vendor Links
                                </Card.Header>
                                <div style={{ float: 'left' }}>
                                    <Button primary onClick={this.AddBuyerVendor} id='vendor'>
                                        Add Vendor
                                    </Button>
                                    <Button primary onClick={this.AddBuyerVendor} id='buyer'>
                                        Add Buyer
                                    </Button>
                                    <AddBuyerVendorPopUp open={this.state.open} isBuyer={this.state.isBuyer} currentorgname={this.state.currentorg.name} curorgid={this.state.currentorg.id} onClose={() => this.loadVendorBuyerLinks() } />
                                </div>
                                <div style={{ clear: 'both' }}>
                                    {/* Table with all the Users in the Organization*/}
                                    Table From Spec Goes here
                                    <LinksTable data={this.state.data} isLoad={this.state.isLoad} currentorgname={this.state.currentorg.name} onChange={() => this.loadVendorBuyerLinks() } />
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }





}




