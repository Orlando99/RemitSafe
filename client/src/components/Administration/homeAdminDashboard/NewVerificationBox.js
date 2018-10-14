import React, { Component } from 'react';
import { Button,  Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class NewVerificationBox extends Component {
	constructor(props) {
		super(props);
	}

    viewAllClick = (e) => {
        this.context.router.history.push("/NowTeamDashboard/pendingverifications");
    }

	render() {
		return(
			<Card className="msgbox" >
                    <Card.Content>
                    {/* Which should we Kepp, Header or Description */}
                        {/*<Card.Header textAlign="center"
                            style={{
                                marginBottom: '1%'
                            }}
                        > You have {this.props.number} new {this.props.field} <br/>
                            pending verification </Card.Header>*/}
                        <Card.Description textAlign="center"
                            style={{
                                marginBottom: '10px',
                                fontSize: '16px'
                            }}
                        >
                        	You have {this.props.number} new {this.props.field} <br/>
                        	pending verifications
                        </Card.Description>

                        <Button primary
                            onClick={this.viewAllClick}
                        > View All </Button>
                    </Card.Content>
                </Card>
		)
	}
}

NewVerificationBox.contextTypes = {
    router: PropTypes.object.isRequired
};


