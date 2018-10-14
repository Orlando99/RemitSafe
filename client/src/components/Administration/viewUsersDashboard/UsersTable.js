import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Grid, Dropdown, Search } from 'semantic-ui-react';
import CommonFunctions from '../../../CommonFunctions';
import _ from 'lodash'
//Stylesheet
import "react-table/react-table.css";
import userStore from '../../../stores/userStore';

export default class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoad: true,
            isLoading: false,
            fetch: "5",
            results: []
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        userStore.addChangeListener(this.onChange);
        userStore.getAllUsersCall(this.state.fetch);
    }
    componentWillUnmount() {
        userStore.removeChangeListener(this.onChange);
    }
    onChange() {
        this.state.data = userStore.getAllUsers();
        this.setState({
            data: [...this.state.data],
            isLoad: false
        });
    }
    Pagination = (e, data) => {
        this.setState({ fetch: data.value, isLoad: true });
        userStore.getAllUsersCall(data.value);
    }
    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        if (value.length < 1) {
            this.setState({ isLoading: false, isLoad: true, results: [] });
            userStore.getAllUsersCall(this.state.fetch);
        }
        else {
            userStore.searchUserByName(value, (result) => {
                this.state.results = result;
                this.setState({ isLoading: false, results: [...this.state.results] })
            })
        }


    }
    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, isLoad: true });
        userStore.loadUser(result.id, (data) => {
            this.state.data = data;
            this.setState({
                data: [...this.state.data],
                isLoading: false,
                isLoad: false
            })
        });
    }
    actionCell = (cellinfo) => {
        return (
            <Button size="mini" primary id={cellinfo.original.userid} >Edit</Button>
        )
    }
    dateFormate = (cellinfo) => {
        var d = new Date(cellinfo.value);
        return CommonFunctions.getFormatedDate(d);
    }
    render() {
        const { isLoading, results, value } = this.state
        return (
            <div>
                <Grid padded>
                    <Grid.Row className="rt-thead" >
                        <Dropdown onChange={this.Pagination} placeholder='View 5 at a time' className="leftmargin" additionPosition="top" selection direction="left" options={CommonFunctions.getPaginationOptions()} value={this.state.fetch} />
                        <Dropdown onChange={this.Pagination} placeholder='Sort By' className="leftmargin" additionPosition="top" selection direction="left" options={CommonFunctions.getSortByOptions()} value={this.state.pagination} />
                        <Search
                            placeholder="Search For Users Here"
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
                    columns={[
                        {
                            Header: 'Users Name',
                            accessor: 'username'
                        },
                        {
                            Header: 'Organizations Name',
                            accessor: 'companyname'
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
                            accessor: 'nowverify'
                        },
                        {
                            Header: 'Join Date',
                            accessor: 'createdAt',
                            Cell: this.dateFormate
                        },
                        {
                            Header: 'Actions',
                            Cell: this.actionCell
                        }
                    ]}
                    className='-striped -highlight orgTable'
                    loading={this.state.isLoad}
                    pageSize={this.state.data.length == 0 ? 5 : this.state.data.length}
                    showPagination={false}
                    showPageJump={true}
                />
            </div>
        )
    }
}