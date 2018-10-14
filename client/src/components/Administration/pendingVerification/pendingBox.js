import React from 'react';
import { Card, Grid} from 'semantic-ui-react';


//Style Sheet
import '../../../adminStyles.css';


const PendingBox = (props) => {
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
                        > <strong>Pending Verifications</strong> 
                        </Card.Header>
                    </Card.Content>
                </Card>
        </Grid.Column>
		)
}

export default PendingBox;

