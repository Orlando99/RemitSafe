import React from 'react';
import toastr from 'toastr';
import Spinner from '../Spinner';
import loginStore from '../../stores/loginStore';
import { Message } from 'semantic-ui-react'
import CommonFunctions from '../../CommonFunctions';
import { Link } from 'react-router-dom';
export default class VerifyEmail extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoad: false,
            verify: 'pending'
        }
    }
    componentDidMount() {
        this.setState({ isLoad: true });
        var email = CommonFunctions.getParameterByName("email");

        loginStore.verifyEmail(email, (res) => {
            this.setState({ isLoad: false });
            if (res) {
                this.setState({ verify: 'Completed' });
                toastr.success('confirmation done');
            }
        })
    }

    render() {
        return (
            <Spinner isLoad={this.state.isLoad}>
                    <Message info
                             style={{
                                 textAlign: 'center',
                                 width: '40%',
                                 margin: 'auto',
                                 marginTop: '1.9%',
                                 marginBottom: '1%'
                             }}
                    >
                        <Message.Header>
                            Confirmation Process
                        </Message.Header>
                        <p>{this.state.verify}</p>
                    </Message>

                <div
                    style={{
                        textAlign: 'center'
                    }}
                >
                    <Link to='/'>
                        <input
                            style={{
                            color: '#003366',
                            background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} value="Login Now" className="ui button info" />
                    </Link>
                </div>
            </Spinner>
        )
    }
}
