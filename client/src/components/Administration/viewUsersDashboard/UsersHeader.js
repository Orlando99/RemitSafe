import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const UsersHeader = (props) => {
    return(
        <Grid.Column width={16} className='marginTopNavFix gridColumnAliign'>
            <Card className="msgbox">
                <Card.Content>
                    <Card.Header
                        style={{
                            marginBottom: '1%',
                            fontSize: '22px',
                            textAlign: 'center',
                            paddingTop: '15px'
                        }}
                    > <strong>Users</strong>
                    </Card.Header>
                </Card.Content>
            </Card>
        </Grid.Column>

    )
}

export default UsersHeader;