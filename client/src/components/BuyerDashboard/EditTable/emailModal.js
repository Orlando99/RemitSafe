import React, {Component} from 'react';
import {Button, Modal, Icon, Form, Divider, Input, Select, Header} from 'semantic-ui-react';

const options = [
    { key: 'y', text: 'Yes', value: 'yes' },
    { key: 'n', text: 'No', value: 'no' },
]
export default class EmailRequest extends Component {
    state = {};

    handleChange = (e, { value }) => this.setState({ value });


    handleOpen = () => {
        this.setState({modalOpen: true})
    };

    handleClose = () => {
        this.setState({modalOpen: false})
    };

    render() {
        const { value } = this.state;
        return (
            <Modal
                trigger={<Button style={{padding: '10px', marginTop: '-19px'}} role={"button"} floated='right' color='green' size='small' icon='mail'/>}
                open={this.state.modalOpen}
                onClose={this.handleClose}>
                <Modal.Header>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='users' circular />
                        <Header.Content>
                            RemitSafe® Registration Request
                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} label='Company Name' placeholder='Enter your company name' />
                            <Form.Field control={Input} label='Contact Name' placeholder='Enter your company contact' />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} label='Phone Number' placeholder='Enter your contact phone number' />
                            <Form.Field control={Input} label='Email' placeholder='Enter your contact email' />
                            <Form.Field control={Select} label='Send receipt of RemitSafe® Request' options={options} placeholder='Select Status' />
                        </Form.Group>
                        <Divider hidden/>
                        {/*<Form.Field control={Button}>Submit</Form.Field>*/}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleClose}>
                        <Icon name='send'/>
                       Send
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
