import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Card } from 'semantic-ui-react';


export default class Notifications extends Component {
	constructor(props) {
		super(props);
	}



	render() {
		return(
				<Grid.Column width={16} className='gridColumnAliign'>
                    <Card className="msgbox" >
                        <Card.Content>
                            <Card.Header textAlign="center"
                            	style={{
                            		fontSize: '22px'
                            	}}
                            ><u> Notifications </u></Card.Header>
                            <Card.Description textAlign="center">
                            	Notification Message goes here. (Single field from Database)
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
			)
	}
}


