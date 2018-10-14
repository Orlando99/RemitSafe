import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//Components
import Navbar from '../adminNav/Navbar';
import OrganizationHeadBox from './OrgsHeader';
import OrganizationsTable from './OrganizationsTable';

export default class AllOrgsDashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navbar isHome={false} isUser={false} isOrg={true}/>
                <OrganizationHeadBox />
                <Grid>
                    <Grid.Column>
                        <Card className='pendingViewCard'>
                            <Card.Content>
                                {/*<Card.Header>*/}

                                {/*</Card.Header>*/}
                                <Container>
                                    <OrganizationsTable />
                                </Container>

                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>

        )
    }





}





