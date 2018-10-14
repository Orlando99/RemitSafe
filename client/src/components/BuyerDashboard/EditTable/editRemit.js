import React, {Component} from 'react';
import {Button, Modal, Icon, Form, Divider, Input, Select, Header} from 'semantic-ui-react';

export default class EditRemit extends Component {
    state = {
        bankName: this.props.remitInfo.bankName
    };

    handleChange = (e, { value }) => this.setState({ value });


    handleOpen = () => {
        this.setState({modalOpen: true})
    };

    handleClose = () => {
        this.setState({modalOpen: false})
    };

    handleDelete = () => {
        this.props.handleDelete()
        this.handleClose()
    }

    handleSave = () => {
        this.props.handleEditRemitInfo(this.props.cellInfo, this.state)
    }


    render() {
        const { value } = this.state;
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen} style={{padding: '10px', marginTop: '-19px'}} role={"button"} floated='right' color='green' size='small' icon='mail'/>}
                open={this.state.modalOpen}
                onClose={this.handleClose}>
                <Modal.Header>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='users' circular />
                        <Header.Content>
                            RemitSafe® Remit Information
                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} label='bankName' value={this.state.bankName} placeholder='Enter your company name' />
                            <Form.Field control={Input} label='Contact Name' placeholder='Enter your company contact' />
                            <Form.Field control={Input} label='streetAddress1' placeholder='Enter your company contact' />
                            <Form.Field control={Input} label='routingNo' placeholder='Enter your company contact' />
                            <Form.Field control={Input} label='accountNo' placeholder='Enter your company contact' />
                        </Form.Group>
                        <Divider hidden/>
                    </Form>
                </Modal.Content>
                <Modal.Actions style={{background: '#b3bbbf'}}>
                    <Button style={{color:'#003366', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }} onClick={this.handleClose}>
                    <Icon name='send'/>
                        Send
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

