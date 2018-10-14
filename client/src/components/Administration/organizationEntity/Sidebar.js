import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';


// Components
import OrgProfile from './OrgProfile';
import BuyerVendorLinks from './BuyerVendorLinksBox';
import RemittanceInformation from './RemittanceInformation';
import ViewLogs from './ViewLogs';

//Stores
import oraganizationStore from '../../../stores/oraganizationStore';
// StyleSheet
import '../../../adminStyles.css';

export default class OrgSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOrg: oraganizationStore.getCurrentOrgforView()
        }
    }

    profileClick = (e) => {
        if (this.state.currentOrg == null) {
            this.state.currentOrg = oraganizationStore.getOraganizationForHeader();
        }
        this.context.router.history.push({
            pathname: '/NowTeamDashboard/organizations/' + this.state.currentOrg.name + '/profile/1',
        });
    }

    linksClick = (e) => {
        if (this.state.currentOrg == null) {
            this.state.currentOrg = oraganizationStore.getOraganizationForHeader();
        }
        this.context.router.history.push({
            pathname: '/NowTeamDashboard/organizations/' + this.state.currentOrg.name + '/links/2',
        });
    }

    remitClick = (e) => {
        if (this.state.currentOrg == null) {
            this.state.currentOrg = oraganizationStore.getOraganizationForHeader();
        }
        this.context.router.history.push({
            pathname: '/NowTeamDashboard/organizations/' + this.state.currentOrg.name + '/remittance/3',
        });
    }

    logsClick = (e) => {
        if (this.state.currentOrg == null) {
            this.state.currentOrg = oraganizationStore.getOraganizationForHeader();
        }
        this.context.router.history.push({
            pathname: '/NowTeamDashboard/organizations/' + this.state.currentOrg.name + '/logs/4',
        });
    }


    render() {
        let profilecls, linkcls, remitcls, logcls;
        if (this.props.id == 1) {
            profilecls = 'ui positive button organizationButtonStyle';
            linkcls = 'ui primary button organizationButtonStyle';
            remitcls = 'ui primary button organizationButtonStyle';
            logcls = 'ui primary button organizationButtonStyle';
        }
        else if (this.props.id == 2) {
            profilecls = 'ui primary button organizationButtonStyle';
            linkcls = 'ui positive button organizationButtonStyle';
            remitcls = 'ui primary button organizationButtonStyle';
            logcls = 'ui primary button organizationButtonStyle';
        }
        else if (this.props.id == 3) {
            profilecls = 'ui primary button organizationButtonStyle';
            linkcls = 'ui primary button organizationButtonStyle';
            remitcls = 'ui positive button organizationButtonStyle';
            logcls = 'ui primary button organizationButtonStyle';
        }
        else if (this.props.id == 4) {
            profilecls = 'ui primary button organizationButtonStyle';
            linkcls = 'ui primary button organizationButtonStyle';
            remitcls = 'ui primary button organizationButtonStyle';
            logcls = 'ui positive button organizationButtonStyle';
        }
        return (
            <Grid.Column width={4} >
                <Button.Group vertical
                    style={{
                        marginTop: '-10px'
                    }}
                >
                    <Button onClick={this.profileClick} className={profilecls}> Organization Profile </Button>
                    <Button onClick={this.linksClick} className={linkcls}> Buyers/Vendors Links </Button>
                    <Button onClick={this.remitClick} className={remitcls}> Remittance Informations </Button>
                    <Button onClick={this.logsClick} className={logcls}> View Logs </Button>
                </Button.Group>
            </Grid.Column>
        )
    }



}

OrgSidebar.contextTypes = {
    router: PropTypes.object.isRequired
}
