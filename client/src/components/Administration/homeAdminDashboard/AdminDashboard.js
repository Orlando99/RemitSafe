import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//Store
import loginStore from '../../../stores/loginStore';
// Components
import { checkSession } from '../../awshelper';
import Navbar from '../adminNav/Navbar';
import Notifications from './notifications';
import NumberComponentBox from './NumberComponentBox';
import NewVerificationBox from './NewVerificationBox';
import AllNewVerificationBox from './AllNewVerificationBox';
import Spinner from '../../Spinner';
//Stores
import nowadminStore from '../../../stores/nowadminStore';
// Style Sheet


export default class AdminDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			organizationsNumber: 0,
			usersNumber: 0,
			verifiedOrganizationsNumber: 0,
			buyersToVendorsLinksNumber: 0,
			regNumber: 0,
			remitNumber: 0,
		};
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		checkSession((isvalid) => {
			if (isvalid == false || loginStore.getUserType() === 'user') {
				this.context.router.history.push("/");
			}
			else {
				nowadminStore.addChangeListener(this.onChange);
				this.setState({ isLoad: true });
				nowadminStore.getDashboardCountsCall();
			}
		})

	}
	componentWillUnmount() {
		nowadminStore.removeChangeListener(this.onChange);
	}
	onChange() {
		this.setState({
			organizationsNumber: nowadminStore.getOraganizationCount(),
			usersNumber: nowadminStore.getUserCount(),
			verifiedOrganizationsNumber: nowadminStore.getVerifiedOrg(),
			buyersToVendorsLinksNumber: nowadminStore.getBuyerVendorLinks(),
			regNumber: nowadminStore.getPendingUser(),
			remitNumber:nowadminStore.getPendingRemitApprove(),
			isLoad: false
		});
	}

	render() {
		return (
			<div>
				<Spinner isLoad={this.state.isLoad}>
					<Navbar isHome={true} isUser={false} isOrg={false} />
					<div>
						<Notifications
							style={{
								marginTop: '30%'
							}}
						/>
					</div>

					{/* Number component Boxes */}
					<div
						style={{
							width: '83%',
							margin: 'auto'
						}}
					>
						<Grid columns='equal'>
							<Grid.Row stretched>
								<Grid.Column>
									<NumberComponentBox
										number={this.state.organizationsNumber}
										field={'Organizations'}
									/>
								</Grid.Column>
								<Grid.Column>
									<NumberComponentBox
										number={this.state.usersNumber}
										field={'Users'}
									/>
								</Grid.Column>
								<Grid.Column>
									<NumberComponentBox
										number={this.state.verifiedOrganizationsNumber}
										field={'Verified Organizations'}
									/>
								</Grid.Column>
								<Grid.Column>
									<NumberComponentBox
										number={this.state.buyersToVendorsLinksNumber}
										field={'Buyers to Vendors Links'}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</div>

					{/* View All Component Boxes */}
					<div
						style={{
							width: '40%',
							textAlign: 'center',
							margin: 'auto',
							marginTop: '-20px'
						}}
					>
						{/*<Grid columns='equal'>*/}
							{/*<Grid.Row stretched>*/}
								{/*<Grid.Column>*/}
									{/*<NewVerificationBox*/}
										{/*number={this.state.regNumber}*/}
										{/*field={'registrations'}*/}
									{/*/>*/}
								{/*</Grid.Column>*/}
								{/*<Grid.Column>*/}
									{/*<NewVerificationBox*/}
										{/*number={this.state.remitNumber}*/}
										{/*field={'remittance'}*/}
									{/*/>*/}
								{/*</Grid.Column>*/}
							{/*</Grid.Row>*/}
						{/*</Grid>*/}

						<Grid>
							<Grid.Row stretched>
								<Grid.Column>
									<AllNewVerificationBox
										regNumber={this.state.regNumber}
                                        regField={'registrations'}
                                        remitNumber={this.state.remitNumber}
                                        remitField={'remittance'}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>


					</div>
				</Spinner>
			</div>

		)
	}
}
AdminDashboard.contextTypes = {
	router: PropTypes.object.isRequired
};








