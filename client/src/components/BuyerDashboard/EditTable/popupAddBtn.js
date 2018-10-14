import React from 'react'
import { Button, Popup } from 'semantic-ui-react';
import EmailRequest from './emailModal';
const popupAddBtn = () => (
    <div>
    <Popup
        trigger={<Button style={{padding: '10px', marginTop: '-19px'}} role={"button"} floated='right' color='green' size='small' icon='mail'/>}
        content='Send RemitSafe® registration request to my vendor'
        position='right center'/>
    <EmailRequest/>
    </div>
);

export default popupAddBtn
