import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import { Icon } from 'semantic-ui-react';
import CommonFunctions from '../../../CommonFunctions';

import vendorStore from '../../../stores/vendorStore';
//Stylesheet
import "react-table/react-table.css";

export default class LinksTable extends Component {
    constructor(props) {
        super(props);

    }

    actionCell = (cellinfo) => {
        var datacell = JSON.stringify(cellinfo.original);
        return (
            <React.Fragment>
                <Icon size="large"
                    className="pointer"
                    color="red"
                    id={cellinfo.original.id}
                    onClick={() => this.onDeleteClick(cellinfo)} name='delete' />
            </React.Fragment>
        )
    }
    onDeleteClick(cellinfo) {
        vendorStore.unassginVendorBuyer(cellinfo.original.id, '', (res) => {
            this.props.onChange();
        });
    }
    dateFormate = (cellinfo) => {
        var d = new Date(cellinfo.value);
        return CommonFunctions.getFormatedDate(d);
    }
    render() {
        return (
            <div>
                <ReactTable

                    className='-striped -highlight'
                    data={this.props.data}
                    loading={this.props.isLoad}
                    pageSize={this.props.data.length == 0 ? 5 : this.props.data.length}
                    showPagination={false}
                    columns={[
                        // This column iwll display wether the organization we are on is the buyer or Vendor
                        {
                            //  This is the Organization linked here. Let me know if you have questions as to what goes here.
                            Header: 'Organization To',
                            accessor: 'name'
                        },
                        {
                            Header: 'My Role',
                            accessor: 'isbuyer',
                            Cell: (cellinfo) => {
                                return cellinfo.value === 1 ? "Buyer" : "Vendor"
                            }
                        },
                        {
                            Header: 'Start Date',
                            accessor: 'createdAt',
                            Cell: this.dateFormate
                        },
                        {
                            Header: 'Update Date',
                            accessor: 'updatedAt',
                            Cell: this.dateFormate
                        },
                        {
                            Header: 'Link Status',
                            accessor: 'linkverify',
                            Cell: (cellinfo) => {
                                return cellinfo.value === 1 ? "Verified" : "Pending"
                            }
                        },
                        {
                            Header: 'Remove',
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