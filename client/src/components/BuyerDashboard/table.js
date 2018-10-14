import React, { Component } from 'react';
import DeleteRow from '../BuyerDashboard/EditTable/deleteRow';
import AddRow from '../BuyerDashboard/EditTable/addRow';
import EditorV from '../BuyerDashboard/EditTable/editModal';
import { staticFill } from "../../data.js";
import VendorStore from '../../stores/vendorStore';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import DeleteHoverStyle from './EditTable/DeleteHoverStyle'
import ViewRemitInfo from './ViewRemitInfo';
export default class TableDynamic extends Component {

    constructor() {
        super()
        this.state = {
            data: []
        }

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: []
        });
    }
    LoadData() {

        for (let index = 0; index < this.props.data.length; index++) {
            const element = this.props.data[index];
            var obj = {
                "id": element.id,
                "reSafeVerified": element.isverified === 0 ? 'Pending' : 'Verified',
                "companyName": element.name,
                "email": element.emailaddress,
                "orgid": element.orgid,
                "isregistered": element.isregistered === 0 ? 'Waiting Registration' : 'Registration Complete',
                "vendorContact": {
                    "address1": element.address1,
                    "address2": element.address2,
                    "city": element.city,
                    "state": element.state,
                    "zip": element.zip,
                    "country": element.country,
                    "phoneNumber": element.phone
                },
                "remitInfo": {
                    "linkverified": element.linkverify
                }
            }
            this.state.data.push(obj);
        }

    }
    //remitSafe Ver not editable
    renderEditable = (cellInfo) => {
        console.log(cellInfo);
        return (
            <div
                style={{ backgroundColor: "#fafafa", textAlign: "center" }}
                // contentEditable
                // suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        )
    };

    vendorContactRender = (cellInfo) => {
        return (
            <div>
                <div>{cellInfo.value.address1}</div>
                <div>{cellInfo.value.address2}</div>
                <div>{cellInfo.value.city}</div>
                <div>{cellInfo.value.state}</div>
                <div>{cellInfo.value.zip}</div>
                <div>{cellInfo.value.country}</div>
                <div>{cellInfo.value.phoneNumber}</div>


            </div>
        )
    };


    vendorRemitInfo = (cellInfo) => {
        return (
            <div>
                <div>{cellInfo.value.linkverified == 0 ? <div style={{ textAlign: 'center' }}>Pending</div> : <div style={{ textAlign: 'center' }}> <ViewRemitInfo id={cellInfo.original.orgid} >View</ViewRemitInfo></div>}</div>

                <div>{cellInfo.value.streetAddress1}</div>

                <div>{cellInfo.value.routingNo}</div>

                <div>{cellInfo.value.accountNo}</div>
            </div>
        )
    };


    actionCell = (cellInfo) => {
        return (
            <div style={{ textAlign: 'center' }}>
                {/* <DeleteRow handleDelete={this.handleDelete(cellInfo.original.id)} />*/}
                {this.props.isAdd ?
                    <AddRow id={cellInfo.original.id}
                        isBuyer={this.props.isBuyer} email={cellInfo.original.email} companyname={cellInfo.original.companyName} />
                    : <Button style={{ background: 'transparent' }}
                        data-company={cellInfo.original.companyName}
                        id={cellInfo.original.id} onClick={this.props.removeAssociation} icon >
                        <DeleteHoverStyle id={cellInfo.original.id} company={cellInfo.original.companyName} />
                    </Button>
                }
                {/*<EditorV />*/}
                {/*<AddRow handleAdd={this.handleAdd(cellInfo.original.id)} />*/}
            </div>
        )
    };

    handleDelete = (id) => {
        return (
            () => {
                let updatedData = this.state.data.filter(row => (row.id !== id))
                this.setState({ data: updatedData })
            }
        )
    };

    handleAdd = () => {
        return (
            () => {
                let addData = this.state.data.append(row => (row.data))
                this.setState({ data: addData })
            }
        )
    };
    render() {
        this.LoadData();
        // const { data } = this.state;
        return (
            <div>
                {this.state.data.length > 0 && this.props.isBuyer == false ? <ReactTable
                    data={this.state.data}
                    noDataText="No record found!"
                    columns={[
                        {
                            Header: "Company Name",
                            accessor: "companyName",
                        },
                        {
                            Header: "Company Info",
                            accessor: "vendorContact",
                            Cell: this.vendorContactRender
                        },
                        {
                            Header: " Remit Info",
                            accessor: "remitInfo",
                            Cell: this.vendorRemitInfo
                        },

                        {
                            Header: "Registration Status",
                            accessor: "isregistered",
                        },
                        {
                            Header: "RemitSafe Verified",
                            accessor: "reSafeVerified",

                        },
                        {
                            Header: "Actions",
                            Cell: this.actionCell
                        },
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                /> : <ReactTable
                        data={this.state.data}
                        noDataText="No record found!"
                        columns={[
                            {
                                Header: "Company Name",
                                accessor: "companyName",
                            },
                            {
                                Header: "Company Info",
                                accessor: "vendorContact",
                                Cell: this.vendorContactRender
                            },
                            this.props.isAdd ? '' :
                            {
                                Header: " Remit Info",
                                accessor: "remitInfo",
                                Cell: this.vendorRemitInfo
                            },

                            {
                                Header: "Registration Status",
                                accessor: "isregistered",
                            },
                            {
                                Header: "RemitSafe Verified",
                                accessor: "reSafeVerified",

                            },
                            {
                                Header: "Actions",
                                Cell: this.actionCell
                            },
                        ]}
                        defaultPageSize={5}
                        className="-striped -highlight"

                    />}
                <br />
            </div>
        );
    }
};

