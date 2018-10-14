import React from 'react';

let GoodbyeMessage = props => (
    <div>
        {/*going to change local storage of logged in  name*/}
        <h3>{`You , ${props.email} you have successfully logged out of your account`}</h3>
    </div>
);


export default GoodbyeMessage;
