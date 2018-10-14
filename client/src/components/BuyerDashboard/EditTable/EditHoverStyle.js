import React, {Component} from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';



export default class EditHoverStyle extends Component {
    state = {hover: false};

    toggleHover = () => {
        this.setState({hover: !this.state.hover})
    };

    hoverColor;

    render() {
        if (this.state.hover) {
            this.hoverColor = {color: 'green'}
        } else {
            this.hoverColor = {color: '#000',  textShadow: '(-1px -1px 0 #000, 1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000)'}
        }
        return (
            <Icon style={this.hoverColor} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} name='edit'/>

        )
    }
}

