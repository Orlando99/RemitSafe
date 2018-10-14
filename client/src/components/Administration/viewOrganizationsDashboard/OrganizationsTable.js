import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Grid, Dropdown, Search } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import _ from 'lodash'
//Stores
import organizationStore from '../../../stores/oraganizationStore';
//Stylesheet
import "react-table/react-table.css";
import oraganizationStore from '../../../stores/oraganizationStore';
import adminStore from '../../../stores/adminStore';
import CommonFunctions from '../../../CommonFunctions';

export default class OrganizationsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fetch: 5,
            pagination: '5',
            isLoad: true,
            isLoading: false,
            results: []
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        oraganizationStore.addChangeListener(this.onChange);
        oraganizationStore.getAllOrgsCall(this.state.fetch);
    }
    componentWillUnmount() {
        oraganizationStore.removeChangeListener(this.onChange);
    }
    onChange() {
        this.state.data = oraganizationStore.getAllOrgs();
        this.setState({
            data: [...this.state.data],
            isLoad: false
        })
    }
    onViewClick = (e) => {
        var currentOrg = JSON.parse(e.target.getAttribute('data-cell'));
        organizationStore.setCurrentOrgforView(currentOrg);
        this.context.router.history.push({
            pathname: '/NowTeamDashboard/organizations/' + currentOrg.name + '/profile/1',
        });
    }
    Pagination = (e, data) => {
        this.setState({ fetch: data.value, pagination: data.value, isLoad: true, data: [] });
        oraganizationStore.getAllOrgsCall(data.value);
    }
    cityStateRender = (cellinfo) => {

        return (
            <div>
                <span>{cellinfo.original.city} {cellinfo.original.state != "" ? <span>,</span> : null} {cellinfo.original.state}</span>
            </div>
        )
    }
    statusRender = (cellinfo) => {
        return (
            <div >
                {cellinfo.value === 0 ? <span>Pending</span> : <span>Verified</span>}
            </div>
        )
    }
    actionCell = (cellinfo) => {
        var datacell = JSON.stringify(cellinfo.original);
        return (
            <Button size="mini" primary id={cellinfo.original.id} data-cell={datacell} onClick={this.onViewClick}>View</Button>
        )
    }
    dateFormate = (cellinfo) => {
        var d = new Date(cellinfo.value);
        return CommonFunctions.getFormatedDate(d);
    }
    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        if (value.length < 1) {
            this.setState({ isLoading: false, isLoad: true, results: [] });
            oraganizationStore.getAllOrgsCall(this.state.fetch);
        }
        else {
            organizationStore.searchOrgByName(value, (result) => {
                this.state.results = result;
                this.setState({ isLoading: false, results: [...this.state.results] })
            })
        }


    }
    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, isLoad: true });
        organizationStore.loadOraganization(result.id, (data) => {
            this.state.data = data;
            this.setState({
                data: [...this.state.data],
                isLoading: false,
                isLoad: false
            })
        });
    }

    render() {
        const { isLoading, results, value } = this.state
        return (
            <div>
                <Grid padded>
                    <Grid.Row className="rt-thead" >
                        <Dropdown onChange={this.Pagination} placeholder='View 5 at a time' className="leftmargin" additionPosition="top" selection direction="left" options={CommonFunctions.getPaginationOptions()} value={this.state.pagination} />
                        <Search
                            placeholder="Search For Organization Here"
                            size="big"
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
                    data={this.state.data}
                    noDataText="No record found!"
                    columns={[
                        {
                            Header: 'Organization Name',
                            accessor: 'name'
                        },
                        {
                            Header: 'City, State',
                            accessor: 'city',
                            Cell: this.cityStateRender
                        },
                        {
                            Header: 'NOW Client ID',
                            accessor: 'nowClientId'
                        },
                        {
                            Header: 'NOW Customer Key',
                            accessor: 'nowCustomerKey'
                        },
                        {
                            Header: 'Status',
                            accessor: 'isverified',
                            Cell: this.statusRender
                        },
                        {
                            Header: 'Join Date',
                            accessor: 'createdAt',
                            Cell: this.dateFormate
                        },
                        {
                            Header: 'Updated Date',
                            accessor: 'updatedAt',
                            Cell: this.dateFormate
                        },
                        {
                            Header: 'Actions',
                            Cell: this.actionCell
                        }
                    ]}
                    pageSize={this.state.data.length == 0 ? 5 : this.state.data.length}
                    showPagination={false}
                    className="-striped -highlight orgTable"
                    loading={this.state.isLoad}
                />
            </div>
        )
    }
}
OrganizationsTable.contextTypes = {
    router: PropTypes.object.isRequired
}