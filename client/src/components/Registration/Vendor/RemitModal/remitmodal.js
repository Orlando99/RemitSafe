import React, {Component} from 'react';
import {Button, Modal, Icon} from 'semantic-ui-react';

export default class RemitModal extends Component {

    state = {modalOpen: false};

    handleOpen = () => {
        this.setState({modalOpen: true})
    };

    handleClose = () => {
        this.setState({modalOpen: false})
    };

    render() {
        return (
            <Modal
                trigger={<Button style={{fontSize: '0.95em', border: 'none', padding: '0', background: 'none', color: '#3b5998', textShadow: "(-1px -1px 0 #fffdfb, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF)", fontWeight: '700'}} onClick={this.handleOpen}> <i>Learn more.</i></Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'>
                <Modal.Header
                    style={{fontSize: "0.95em", border: "none", background: "none", color: "#FFF", textShadow: "(-1px -1px 0 #fffdfb, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF)", fontWeight: 700}}>
                    <h1>Bank Account & Routing Information</h1>
                </Modal.Header>
                <Modal.Content>
                    <p style={{}}>Your bank routing number is a nine-digit code that's based on your U.S. banking location
                        where your account
                        was opened. It's the first set of numbers printed on the bottom of your checks, on the left
                        side.</p>
                    <p> Your account number (usually between 10 - 12 digits) and is specific to your personal
                        account. It's the second set of
                        numbers printed on the bottom of your checks, just to the right of the bank routing
                        number.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose}>
                        <Icon name='checkmark'/>
                         Got it
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}