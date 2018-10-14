import React, { Component } from 'react'
import { Button, Search, Modal, Header } from 'semantic-ui-react'
import CommonFunctions from '../../../CommonFunctions';
import Spinner from '../../Spinner';
import toastr from 'toastr';
import _ from 'lodash'
//Stores
import vendorStore from '../../../stores/vendorStore';
import buyerStore from '../../../stores/buyerStore';
import adminStore from '../../../stores/adminStore';

//Components
import AddVendorRequest from '../../VendorDashboard/addVendorRequest';
export default class AddBuyerVendorPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            open: false,
            isLoading: false,
            results: [],
            id: 0,
            email: '',
            linkcompanyname: ''
        };
    }
    handleAddManually = () => {

    }
    handleAddSave = () => {
        if (this.state.id === 0) {
            let type = this.props.isBuyer ? "Buyer" : "Vendor";
            toastr.error("Please select the organization for adding " + type);
            return
        }

        if (this.props.curorgid != null && typeof this.props.curorgid != "undefined") {
            this.setState({ isLoad: true });
            if (this.props.isBuyer) {
                buyerStore.assginBuyer(this.props.curorgid, this.state.id, this.state.linkcompanyname, (res) => {
                    this.setState({ isLoad: false });
                    if (res != '') {
                        this.emailVerification(res.id);
                        this.setState({ isLoad: false, open: false });
                    }
                    this.props.onClose();
                });
            }
            else {
                vendorStore.assginVendor(this.props.curorgid, this.state.id, this.state.linkcompanyname, (res) => {
                    this.setState({ isLoad: false });
                    if (res != '') {
                        this.emailVerification(res.id);
                        this.setState({ isLoad: false, open: false });
                    }
                    this.props.onClose();
                });
            }

        }
    }
    emailVerification = (id) => {
        const companyname = this.props.currentorgname;
        var data = {
            id,
            "email": this.state.email,
            companyname,
            isBuyer: this.props.isBuyer
        };
        adminStore.sendVerificationEmail(data, () => {

        });
    }
    handleCancel = () => {
        this.setState({ open: false });
    }
    componentWillReceiveProps(props) {
        if (props != null && typeof props.open != "undefined") {
            this.setState({ open: props.open, value: '' });
        }
        //let find = $(".results transition");
        // debugger;
    }
    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, id: result.id, isLoad: true });
        adminStore.getAllOrgsWithemail(result.id, (allorgs) => {
            if (allorgs != null) {
                this.state.email = allorgs[0].emailaddress;
                this.state.linkcompanyname = allorgs[0].name;
                this.setState({
                    email: this.state.email,
                    linkcompanyname: this.state.linkcompanyname,
                    isLoad: false, isLoading: false
                });
            }
        });
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        if (value.length < 1) {
            this.setState({ isLoading: false, results: [] });
        }
        else {
            vendorStore.searchVendorName(value, (result) => {
                this.setState({ isLoading: false, results: result })
            })
        }
    }

    render() {
        const { isLoading, results, value } = this.state

        return (
            <Modal open={this.state.open} >
                <Modal.Header
                    style={{
                        background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))'
                    }}>
                    <Header as='h3' icon textAlign='center'>
                        {/*<Icon name='user' circular />*/}
                        <Header.Content>
                            <span>Add {this.props.isBuyer ? "Buyer" : "Vendor"} for {this.props.currentorgname}</span>
                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content style={{
                    background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)'
                }}>
                    <Spinner isLoad={this.state.isLoad} >
                        <form className="ui form attached fluid segment">
                            <div className="field">
                                <Search
                                    placeholder="Search orgs"
                                    size="big"
                                    class="searchcls scrolling"
                                    results={results}
                                    value={value}
                                    loading={isLoading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                />
                            </div>
                            <br />

                        </form>
                    </Spinner>
                </Modal.Content>

                <Modal.Actions style={{ background: '#b3bbbf' }}>
                    <AddVendorRequest isBuyer={this.props.isBuyer} isFromAdmin={true} />
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }}
                        onClick={this.handleAddSave}>
                        Add and Save
                                </Button>
                    <Button style={{ color: '#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }}
                        onClick={this.handleCancel}>
                        Cancel
                                </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}