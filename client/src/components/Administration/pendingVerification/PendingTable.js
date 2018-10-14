import React, { Component } from 'react';
import { Button, Grid, Search, Dropdown, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import _ from 'lodash'
//  Import store functions
import pendingStore from '../../../stores/pendingStore';
import oraganizationStore from '../../../stores/oraganizationStore';

import oraganizationActions from '../../../actions/oraganizationActions';
//Stylesheet
import "react-table/react-table.css";
import CommonFunctions from "../../../CommonFunctions";

export default class PendingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            orgData: [],
            userData: [],
            remitData: [],
            fetch: 5,
            pagination: '5',
            isLoad: true,
            isLoading: false,
            results: []
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        pendingStore.addChangeListener(this.onChange);
        pendingStore.getAllPenndingVerification(this.state.fetch);
    };

    componentWillUnmount() {
        pendingStore.removeChangeListener(this.onChange)
    }

    onChange() {
        this.state.data = pendingStore.getAllPendings();
        this.setState({
            data: [...this.state.data],
            isLoad: false
        });
    }

    Pagination = (e, data) => {
        this.setState({
            fetch: data.value,
            pagination: data.value,
            isLoad: true,
            data: []
        });
        pendingStore.getAllPenndingVerification(data.value);
    }
    onActionClick = (e) => {
        let selectedRecord = JSON.parse(e.target.getAttribute('data-cell'));
        if (selectedRecord.type == "User") {
            this.context.router.history.push("/NowTeamDashboard/users");
        }
        else {
            if (selectedRecord.type == "Organization" && selectedRecord.changetype == "Remittance") {
                oraganizationStore.loadOraganization(selectedRecord.id, (response) => {
                    oraganizationActions.receiveOraganization(response[0]);
                    this.context.router.history.push({
                        pathname: '/NowTeamDashboard/organizations/' + selectedRecord.name + '/remittance/3',
                    });
                });

            }
            else {
                this.context.router.history.push({
                    pathname: '/NowTeamDashboard/organizations/' + selectedRecord.name + '/profile/1',
                });
            }

        }

    }
    actionCell = (cellinfo) => {
        let data = JSON.stringify(cellinfo.original);
        return (
            <Icon size="big" className="pointer" name="arrow alternate circle right outline" data-cell={data} id={cellinfo.original.type} color="blue" onClick={this.onActionClick} />
        )
    }

    //  Search Features
    handleSearchChange = (e, { value }) => {
        this.setState({
            isLoading: true,
            value
        });
        if (value.length < 1) {
            this.setState({
                isLoading: false,
                isLoad: true,
                results: []
            });
            pendingStore.getAllPenndingVerification(this.state.fetch);
        } // Close If
        else {
            //    Load function here
            pendingStore.searchAllPending(value, (result) => {
                this.state.results = result;
                this.setState({
                    isLoading: false,
                    results: [...this.state.results]
                })
            })
        } // close else

    }
    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, isLoad: false });
        let data = {
            type: result.changetype,
            orgid: result.id
        }
        pendingStore.loadPendingInformation(data, (data) => {
            this.state.data = data;
            this.setState({
                data: [...this.state.data],
                isLoading: false,
                isLoad: false
            })
        });
    }



    render() {
        const { isLoading, results, value } = this.state;
        return (
            <div>
                <Grid padded>
                    <Grid.Row className='rt-thead' >
                        <Dropdown onChange={this.Pagination}
                            placeholder='View 5 at a time'
                            className='leftmargin'
                            additionPosition='top'
                            selection dirction='left'
                            options={CommonFunctions.getPaginationOptions()}
                            value={this.state.pagination} />
                        <Dropdown onChange={this.Pagination}
                            placeholder='Sort By'
                            className='leftmargin'
                            additionPosition='top'
                            selection direction='left'
                            options={CommonFunctions.getSortByOptions()}
                            value={this.state.pagination} />
                        <Search placeholder='Search Organization or Users here'
                            size='big'
                            className="searchgrid"
                            results={results}
                            value={value}
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                            {...this.props}
                        />
                    </Grid.Row>
                </Grid>





                <ReactTable
                    className='-striped -highlight'
                    data={this.state.data}
                    loading={this.state.isLoad}
                    pageSize={this.state.data.length == 0 ? 5 : this.state.data.length}
                    showPagination={false}

                    columns={[
                        {
                            Header: 'Type',
                            accessor: 'type'
                        },
                        {
                            Header: 'Name',
                            accessor: 'name'
                        },
                        {
                            Header: 'Change Type',
                            accessor: 'changetype'
                        },
                        {
                            Header: 'Actions',
                            accessor: 'actions',
                            Cell: this.actionCell
                        }
                    ]}
                    style={{
                        marginTop: '3%',
                        color: 'black'
                    }}
                />
            </div>
        )
    }
}
PendingTable.contextTypes = {
    router: PropTypes.object.isRequired
}