import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

export default class ConfirmPopUp extends React.Component {
    render() {
        return (
            <div>
                <Modal  open={this.props.open}>
                    <Modal.Header>Are You Sure ?</Modal.Header>
                    <Modal.Content>
                        <p>{this.props.message}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.props.onNoClick}>No</Button>
                        <Button positive onClick={this.props.onYesClick} >Yes</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}