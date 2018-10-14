import React, { Component } from 'react';
import { Card, Checkbox } from 'semantic-ui-react';
import ConfirmPopUp from '../../BuyerDashboard/ConfirmPopUp';
import Spinner from '../../Spinner';
//Stores
import oraganizationStore from '../../../stores/oraganizationStore';
// StyleSheet
import '../../../adminStyles.css';


export default class OrganizationsNameHead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            isVerified: this.getIsverified(),
            message: 'Are you sure you wish to verify this organization ?'
        }
    }
    getIsverified() {
        let getOrg = oraganizationStore.getOraganizationForHeader();
        let isverified = false;
        if (typeof getOrg != "undefined" && getOrg != null) {
            if (getOrg.isverified === 0) {
                isverified = false;
            }
            else {
                isverified = true;
            }
        }
        return isverified;
    }
    componentWillReceiveProps(currentState, nextProps) {
        this.setState({
            isVerified: this.getIsverified()
        })
    }
    onYesClick = (e) => {
        this.setState({ isLoad: true, open: false });
        let data = {
            orgid: oraganizationStore.getOraganizationForHeader().id,
            isverified: this.state.isVerified === true ? 1 : 0
        }
        oraganizationStore.verifyOraganization(data, (res) => {
            this.setState({ isLoad: false });
        })
    };
    onNoClick = (e) => {
        this.setState({ open: false, isVerified: !this.state.isVerified });
    }
    onToggle = (e, data) => {
        let message;
        if (data.checked) {
            message = 'Are you sure you wish to verify this organization ?'
        }
        else {
            message = 'Are you sure you wish to un-verify this organization ?'
        }
        this.setState({ open: true, isVerified: data.checked, message: message });
    }
    render() {

        return (
            <Spinner isLoad={this.state.isLoad}>
                {/*<Grid.Column width={12}>*/}
                <Card className="msgbox marginTopNavFix">
                    <Card.Content>
                        <Card.Header
                            style={{
                                marginBottom: '1%',
                                fontSize: '22px',
                                paddingTop: '15px',
                                fontWeight: 'bold'
                            }}
                        >
                            <span
                                style={{
                                    float: 'left'
                                }}
                            >
                                {this.props.name}
                            </span>
                            <span
                                style={{
                                    float: 'right'
                                }}
                            >
                                Verified: &nbsp;
                            <span>
                                    <ConfirmPopUp open={this.state.open} message={this.state.message} onYesClick={this.onYesClick} onNoClick={this.onNoClick} />
                                    <Checkbox toggle onChange={this.onToggle} checked={this.state.isVerified} />
                                </span>
                            </span>
                        </Card.Header>
                    </Card.Content>
                </Card>
                {/*</Grid.Column>*/}
            </Spinner>
        )
    }
}
