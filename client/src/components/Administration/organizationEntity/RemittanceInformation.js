import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';

// Components
import Navbar from '../adminNav/Navbar';
import OrganizationsNameHead from './OrganizationsNameHead';
import Sidebar from './Sidebar';
import RemitBox from './RemitBox';
import Spinner from '../../Spinner';

//Stores
import oraganizationStore from '../../../stores/oraganizationStore';
import remitStore from '../../../stores/remitStore';
import adminStore from '../../../stores/adminStore';

export default class RemittanceInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoad: true,
            currentorg: oraganizationStore.getOraganizationForHeader(),
            data: []
        }
    }

    componentDidMount() {
        this.loadRemitBankInfo();
    }

    loadRemitBankInfo() {
        var organization = adminStore.getOraganization();
        remitStore.getAllRemitBankInfo(organization.id, (remitInfo) => {
            const newData = [];
            remitInfo.map(function(record) {
                if(record.defaultmethod) {
                    newData.splice(0, 0, record)
                } else {
                    newData.push(record);
                }
            });
            this.setState({ 
                isLoad: false,
                data: newData
            });
        });
    }

    render() {
      
        return (
            <Spinner isLoad={this.state.isLoad}>
                <div className='gridColumnAliign'>
                    <Navbar isHome={false} isUser={false} isOrg={true}/>
                    { this.state.currentorg !=null ? <OrganizationsNameHead name={this.state.currentorg.name}  />:null}
                    <Grid columns={2} className='entityMarginsFix'>
                        <Grid.Column width={4}>
                            <Sidebar id={this.props.match.params.id}/>
                        </Grid.Column>
                        <Grid.Column width={12} className='' >
                            <Card className='infoBoxStyle'>
                                <Card.Content>

                                    {/* Pass in Values from DB below */}
                                    {/* Should be Editbable */}

                                    <Card.Header>
                                        Remittance Address's
                                        <Link to={'/NowTeamDashboard/editremitinfoadmin/0'}>
                                            <Button basic className="rightBtn">Add New</Button>
                                        </Link>
                                    </Card.Header>

                                    <RemitBox data={this.state.data} onChange={() => this.loadRemitBankInfo() }/>

                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                </div>
            </Spinner>
        )
    }

}




