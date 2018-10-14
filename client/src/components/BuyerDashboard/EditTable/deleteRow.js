import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import DeleteHoverStyle from '../EditTable/DeleteHoverStyle'


export default class DeleteRow extends Component {
    constructor(props) {
        super(props);
        this.state={
            modalOpen:false
        }
    }

    handleOpen = () => {
        this.setState({ modalOpen: true })
    }

    handleClose = () => {
        this.setState({ modalOpen: false })
    };

    handleDelete = () => {
        this.props.handleDelete()
        this.handleClose()
    }





    render() {
        
        return (
            <Modal trigger={<Button style={{ background: 'transparent' }}
                onClick={this.handleOpen} icon>
                <DeleteHoverStyle /></Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}>
                <Modal.Header style={{ background: 'linear-gradient(2deg, rgba(196, 205, 229, 0.1), rgba(206, 221, 246, 0.1), rgba(220, 236, 255, 0.1))' }}>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='user' circular />
                        <Header.Content>
                            Delete Contact
                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content style={{
                    background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)', textAlign: 'center', fontSize: '18px'
                }}>
                    <p>Are you sure you want to delete this contact from your list? </p>
                    <p>This action <u><b>can not</b></u> be undone.</p>
                </Modal.Content>
                <Modal.Actions style={{ background: '#b3bbbf' }}>
                    <Button color='red' onClick={this.handleClose}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button style={{ color: '#FFF', background: 'green' }} onClick={this.props.handleDelete}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

