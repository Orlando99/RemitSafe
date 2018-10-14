import React, { Component } from 'react';
import { Button, Image, Icon, Grid, Container, Segment, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Stores
import remitStore from '../../../stores/remitStore';
import adminStore from '../../../stores/adminStore';


export default class RemitBox extends Component {
    constructor(props) {
        super(props);
    }

    makeActive(card){
        card.defaultmethod = 1;
        remitStore.updateRemitInfosActive(card.orgid, card.id, (result) => {
            if(result.data) {
                this.props.onChange();
                var organization = adminStore.getOraganization();
                remitStore.sendEmailToBuyers(card.orgid, organization.name, (result) => {
                    console.log(result);
                })
            }
        });
    }

    makeApprove(card) {
        card.approve = 1;
        remitStore.updateRemitInfos(card, (result) => {
            if(result.data) {
                this.props.onChange();
            }
        });
    }

    makeDeny(card) {
        card.approve = 2;
        remitStore.updateRemitInfos(card, (result) => {
            if(result.data) {
                this.props.onChange();
            }
        });
    }

    renderCard(card) {
        return (             
            <Card className={"remitBoxInfoCopy " + (card.defaultmethod ? 'cardBoxBold' : '')}>
                <Card.Content>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column className='allignLeft'>
                                <Card.Header>
                                    <u>Billing Address: {card.address1}</u>
                                </Card.Header>
                                <Card.Content>
                                    Name:  {card.name}<br/>
                                    Address1: {card.address1}<br/>
                                    Address2: {card.address2}<br/>
                                </Card.Content>
                            </Grid.Column>

                            <Grid.Column className='remitBoxBorderLeft'>
                                <Card.Header>
                                    <u>Bank Information</u>
                                </Card.Header>
                                <Card.Content>
                                    Company Name: {card.companyname}<br/>
                                    Account Number: {card.accountnumber}<br/>
                                    Routing Number: {card.routingnumber}<br/>
                                </Card.Content>
                            </Grid.Column>

                            <Grid.Column className='allignRight'>
                                {card.approve === 0 && 
                                    <Button basic color='orange' className='actionBtn'>
                                        Status: Pending
                                    </Button>
                                }
                                {card.approve === 1 && 
                                    <Button basic color='green' className='actionBtn'>
                                        Status: Approved
                                    </Button>
                                }
                                {card.approve === 2 && 
                                    <Button basic color='red' className='actionBtn'>
                                        Status: Denied
                                    </Button>
                                }
                                {card.approve === 0 && 
                                    <div className="smallPadding">
                                        <Button color='green' className='actionBtn' onClick={() => this.makeApprove(card)}>Approve</Button>
                                        <Button color='red' className='actionBtn' onClick={() => this.makeDeny(card)}>Deny</Button>
                                    </div>
                                }
                                <Link to={'/NowTeamDashboard/editremitinfoadmin/' + card.id }>
                                    <Button primary className='buttonTopMargin'>Edit</Button>
                                </Link>
                                {card.defaultmethod ? <br/> :  
                                    <Button color='yellow' className='buttonTopMargin' onClick={() => this.makeActive(card)}>Make Active</Button>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }

    render() {
        const _self = this;
        return(
            <div
                style={{
                    marginTop: '3%'
                }}
            >
                {/* For Each Remit Info They will have their OWN Row */}
                {
                    this.props.data.map(function(card) {
                        return _self.renderCard(card);                        
                    })
                }                
            </div>
        )
    }
}

RemitBox.contextTypes = {
    router: PropTypes.object.isRequired,
};