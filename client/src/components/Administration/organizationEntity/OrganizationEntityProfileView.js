import React, { Component } from 'react';
import { Icon, Grid, Container, Card } from 'semantic-ui-react';
import toastr from 'toastr';
import ReactTable from 'react-table';
//Stores
import oraganizationStore from '../../../stores/oraganizationStore';
import userStore from '../../../stores/userStore';
import loginStore from '../../../stores/loginStore';
// Components
import Navbar from '../adminNav/Navbar';
import OrganizationsNameHead from './OrganizationsNameHead';
import Sidebar from './Sidebar';
import Spinner from '../../Spinner';
import CommonFunctions from '../../../CommonFunctions';
import EditOrganizationPopup from './EditOrganizationPopup';
import EditOrgUserPopUp from './EditOrgUserPopUp';
import { deleteUser } from '../../awshelper';
import ConfirmPopUp from '../../BuyerDashboard/ConfirmPopUp';
const message = 'Once you delete this user, they will no long have access to the RemitSafe platform. Please confirm that you want to proceed'
export default class OrganizationEntityView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: true,
            isGridLoad: false,
            data: [],
            org: oraganizationStore.getCurrentOrgforView(),
            currentorg: {
                name: this.props.match.params.entityname || '',
            },
            open: false,
            delemail: '',
            delid: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
    }
    componentDidMount() {
        if (this.state.org == null) {
            this.state.org = oraganizationStore.getOraganizationForHeader();
        }
        userStore.addChangeListener(this.onUserChange);
        oraganizationStore.addChangeListener(this.onChange);
        oraganizationStore.loadOraganization(this.state.org.id);
        userStore.loadUserByOrgId(this.state.org.id);
        //this.loadUserByOrg();
    }

    onUserChange() {
        this.state.data = userStore.getUsersByOrg();
        this.setState({
            data: [...this.state.data],
            isGridLoad: false
        });
    }
    componentWillUnmount() {
        oraganizationStore.removeChangeListener(this.onChange);
        userStore.removeChangeListener(this.onUserChange);
    }
    onChange() {
        this.setState({
            currentorg: oraganizationStore.getOraganizationForHeader(),
            isLoad: false
        });
    }
    onDeleteClick = (e) => {
        let email = e.target.getAttribute('data-email');
        this.setState({ open: true, delemail: email, delid: e.target.id });
    }

    loadUserName = (cellinfo) => {
        return cellinfo.original.firstName + ' ' + cellinfo.original.lastName;
    }
    verifyStatus = (cellinfo) => {
        return cellinfo.original.nowverify > 0 ? 'Verified' : 'Pending'
    }
    dateFormate = (cellinfo) => {
        var d = new Date(cellinfo.value);
        return CommonFunctions.getFormatedDate(d);
    }
    actionCell = (cellinfo) => {
        var datacell = JSON.stringify(cellinfo.original);
        return (
            <React.Fragment>
                <EditOrgUserPopUp id={cellinfo.original.id} orgid={this.state.org.id} />
                <Icon size="large"
                    className="pointer"
                    color="red"
                    id={cellinfo.original.id}
                    data-email={cellinfo.original.emailaddress}
                    onClick={this.onDeleteClick} name='delete' />
            </React.Fragment>
        )
    }
    onYesClick = (e) => {
        this.setState({ isLoad: true, open: false });
        deleteUser(this.state.delemail, (re) => {
            if (re == null) {
                loginStore.deleteUser(this.state.delid, (res) => {
                    if (res != null) {
                        toastr.success('User successfully deleted from the system');
                        userStore.loadUserByOrgId(this.state.org.id);
                    }
                    else {
                        this.setState({ isLoad: false, open: false });
                    }
                })
            }
            else {
                this.setState({ isLoad: false, open: false });
            }
        });
    };
    onNoClick = (e) => {
        this.setState({ open: false });
    }
    render() {
        return (
            <Spinner isLoad={this.state.isLoad}>
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
                                        {this.state.currentorg.name}
                                    </Card.Header>
                                    <div>
                                        {this.state.currentorg.address1}  &nbsp;&nbsp; {this.state.currentorg.address2}
                                    </div>
                                    {this.state.currentorg.city}, {this.state.currentorg.state} {this.state.currentorg.zip}
                                    <div>
                                        {this.state.currentorg.phone}
                                    </div>
                                    <Container textAlign='right'>
                                        <ConfirmPopUp open={this.state.open} message={message} onYesClick={this.onYesClick} onNoClick={this.onNoClick} />
                                        <EditOrganizationPopup />
                                    </Container>
                                    <Card.Header>
                                        <br />
                                    </Card.Header>
                                    <ReactTable
                                        data={this.state.data}
                                        columns={[
                                            {
                                                Header: 'Users Name',
                                                Cell: this.loadUserName
                                            },
                                            {
                                                Header: 'Status',
                                                Cell: this.verifyStatus
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
            </Spinner>
        )
    }

}




