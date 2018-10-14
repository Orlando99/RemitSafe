import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';

// Components
import Navbar from '../adminNav/Navbar';
import PendingBox from './pendingBox';
import PendingTable from './PendingTable';


export default class PendingView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Navbar isHome={false} isUser={false} isOrg={false}/>
				<PendingBox className='marginTopNavFix' />
				<Grid>
					<Grid.Column>
						<Card className='pendingViewCard'>
							<Card.Content>
								{/*<Card.Header>*/}

								{/*</Card.Header>*/}
								<Container>
									<PendingTable />
								</Container>

							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid>
			</div>
		)
	}
}







