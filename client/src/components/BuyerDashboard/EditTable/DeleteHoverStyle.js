import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';



export default class DeleteHoverStyle extends Component {
    state = { hover: false };

    toggleHover = () => {
        this.setState({ hover: !this.state.hover })
    };

    hoverColor;

    render() {
        if (this.state.hover) {
            this.hoverColor = { color: 'red' }
        } else {
            this.hoverColor = { color: '#000' }
        }
        return (
            <Icon size='medium' id={this.props.id} style={this.hoverColor} data-company={this.props.company} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} name='trash outline' />

        )
    }
}
