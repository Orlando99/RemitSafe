import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';
import ReactTable from 'react-table';
// Components
import Navbar from '../adminNav/Navbar';
import OrganizationsNameHead from './OrganizationsNameHead';
import Sidebar from './Sidebar';

//Stores
import oraganizationStore from '../../../stores/oraganizationStore';


export default class ViewLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isGridLoad: false,
            currentorg: oraganizationStore.getOraganizationForHeader()
        }

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
                                    System Logs
                                </Card.Header>
                                <ReactTable
                                    data={this.state.data}
                                    columns={[
                                        {
                                            Header: 'Users Name',
                                            Cell: this.loadUserName
                                        },
                                        {
                                            Header: 'Organization',
                                            Cell: this.verifyStatus
                                        },
                                        {
                                            Header: 'Action',
                                            accessor: 'createdAt',
                                            Cell: this.dateFormate
                                        },
                                        {
                                            Header: 'Details',
                                            Cell: this.actionCell
                                        },
                                        {
                                            Header: 'Created At',
                                            Cell: this.actionCell
                                        }
                                    ]}
                                    className='-striped -highlight orgTable'
                                    loading={this.state.isGridLoad}
                                    pageSize={this.state.data.length == 0 ? 5 : this.state.data.length}
                                    showPagination={false}
                                    showPageJump={true}
                                />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }





}




