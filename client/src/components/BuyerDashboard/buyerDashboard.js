import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Statistic, Label, Button } from 'semantic-ui-react'
import AddRow from '../BuyerDashboard/EditTable/addRow';
import TableDynamic from '../BuyerDashboard/table';

import Footer from '../Nav/Footer'
import Nav from '../Nav/Nav'
import { getAPIUrl } from '../awshelper';
import Spinner from '../Spinner';
import buyerStore from '../../stores/buyerStore';
import loginStore from '../../stores/loginStore';
// import EmailModal from '../BuyerDashboard/EditTable/emailModal';



import { Menu, Image, Divider } from 'semantic-ui-react';

export default class buyerDashboard extends Component {
    state = {
        email: '',
        password: '',
        submittedEmail: '',
        submittedPassword: '',
        buyerid: '',
        vendors: [],
        isLoad: false
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    getIntialState() {
        return {
            vendors: buyerStore.getVendors(),
            isLoad:false
        }
    }
    componentDidMount() {

        this.setState({ isLoad: true });
        
        loginStore.getUser(this.props.match.params.email,(id)=>{
            this.state.buyerid=id;
            this.LoadVendor();
        })
        buyerStore.addChangeListener(this.onChange);
    }
    componentWillMount() {
        buyerStore.removeChangeListener(this.onChange);
    }
    onChange() {
        this.setState({
            vendors: buyerStore.getVendors(),
            isLoad:false
        });
    }
    LoadVendor() {
        const { buyerid } = this.state;
        this.setState({ isLoad: true });
        buyerStore.loadVendors(buyerid);
    }
    render() {
        const name = this.state.name;
        return <Spinner isLoad={this.state.isLoad}>

            <Nav />
            <div className="ui hidden padded divider" />
            <div className="ui three statistics">
                <div style={{ flex: '0 0 23.33%' }} className="ui statistic">
                    <div className="value">88</div>
                    <div className="label">Verified Vendors</div>
                </div>
                <div style={{ flex: '0 0 23.33%' }} className="ui statistic">
                    <div className="value">12</div>
                    <div className="label">Unverified &amp; Pending Vendors</div>
                    <AddRow buyerid={this.state.buyerid} />
                </div>
                <div style={{ flex: '0 0 23.33%' }} className="ui statistic">
                    <div className="value">100</div>
                    <div className="label"># Vendors</div>
                </div>
            </div>
            <br />
            <Divider hidden />
            <div style={{ marginBottom: '15%' }} className="ui container">
                <TableDynamic data={this.state.vendors} />
            </div>
            <Footer />



        </Spinner>
    }
}