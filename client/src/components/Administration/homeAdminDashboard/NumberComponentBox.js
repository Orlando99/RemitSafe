import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment } from 'semantic-ui-react';


export default class NumberComponentBox extends Component {
	constructor(props) {
		super(props);
	}



	render() {
		return(
				<Segment className="msgbox"
					style={{
						border: 'none',
						textAlign: 'center'
					}}
				> <strong>{this.props.number}</strong> {this.props.field} </Segment>
			)
	}
}




