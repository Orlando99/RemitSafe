import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//Components
import Navbar from '../adminNav/Navbar';
import UsersHeadBox from './UsersHeader';
import Nav from "../../Nav/Nav";
import UsersTable from './UsersTable'

export default class UsersDashboard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <Navbar isHome={false} isUser={true} isOrg={false}/>
                <UsersHeadBox/>
                <Grid>
                    <Grid.Column>
                        <Card className='pendingViewCard'>
                            <Card.Content>
                                {/*<Card.Header>*/}

                                {/*</Card.Header>*/}
                                <Container>
                                    <UsersTable />
                                </Container>

                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </div>

        )
    }



}




