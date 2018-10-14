import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';

const imgSrc = require('../../../assets/images/RemitSafe-logo-dark_small-transparent.png');
export default class Navbar extends Component {
	constructor(props) {
		super(props);
	}


	homeClick = (e) => {
		this.context.router.history.push("/NowTeamDashboard");
	}

	organizationsClick = (e) => {
		this.context.router.history.push("/NowTeamDashboard/organizations");
	}

	usersClick = (e) => {
		this.context.router.history.push("/NowTeamDashboard/users");
	}


	render() {
		let homebtn, orgbtn, userbtn;

		if (this.props.isHome === true) {
			    homebtn = 'ui positive button',
				orgbtn = 'ui primary button',
				userbtn = 'ui primary button'
		}
		else if (this.props.isUser === true) {
			    homebtn = 'ui primary button',
				orgbtn = 'ui primary button',
				userbtn = 'ui positive button'
		}
		else if (this.props.isOrg === true) {
			    homebtn = 'ui primary button',
				orgbtn = 'ui positive button',
				userbtn = 'ui primary button'
		}
		else {
            	homebtn = 'ui primary button',
                orgbtn = 'ui primary button',
                userbtn = 'ui primary button'
		}
		return (
			<div>

				<div className="ui fixed menu">
					<div class="ui container" >
						<Link to="/"><Image src={imgSrc}
							style={{
								width: '70%',
								height: '100%'
							}} /><br /></Link>
						<div className="textright">
							<Button className={homebtn} onClick={this.homeClick}
								style={{
									marginRight: '5%'
								}}
							> Home </Button>
							<Button className={orgbtn} onClick={this.organizationsClick}
								style={{
									marginRight: '5%'
								}}
							> Organizations </Button>
							<Button className={userbtn} onClick={this.usersClick}
								style={{
									marginRight: '5%'
								}}
							> Users </Button>
							<Link to="/logout" className="linkhover" title="Logout"
								style={{
									marginRight: '-3%'
								}}
							> <Icon name="sign out" size='huge' color="teal" /> </Link>
						</div>
					</div>

				</div>


			</div>

		);
	}

}
Navbar.contextTypes = {
	router: PropTypes.object.isRequired
};