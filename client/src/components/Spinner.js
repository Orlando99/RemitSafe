import React, { Component } from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

class Spinner extends Component {
    render() {
        var className = '';
        if (typeof this.props.isClass != "undefined")
            className = 'marginsetup';
        return (
            <div className={className}>
                <Dimmer active={this.props.isLoad}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                {this.props.children}
            </div>
        )
    }
}

export default Spinner;