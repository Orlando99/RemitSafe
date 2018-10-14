import React from 'react';
import toastr from 'toastr';
import Spinner from '../Spinner';
import adminStore from '../../stores/adminStore';
import { Message } from 'semantic-ui-react'
import CommonFunctions from '../../CommonFunctions';
export default class VerifyAssginVendorBuyer extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoad: false,
            verify: 'pending'
        }
    }
    componentDidMount() {
        this.setState({ isLoad: true });
        var data = CommonFunctions.getParameterByName("data");

        adminStore.verifyAssociation(data, (res) => {
            this.setState({ isLoad: false });
            if (res) {
                this.setState({ verify: 'Completed' });
                toastr.success('Confirmation done');
            }
        })
    }

    render() {
        return (
            <Spinner isLoad={this.state.isLoad}>
                <Message info>
                    <Message.Header>Confirmation Process</Message.Header>
                    <p>{this.state.verify}</p>
                </Message>
            </Spinner>
        )
    }
}
