import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react';
// var img = require('../../assets/images/RemitSafe-logo-dark_small-transparent.png');
var img = require('../../assets/images/RemitSafe-logo-dark_small-transparent.png');


export default class Nav extends Component {
    render() {
        var isLogout = true;
        if (typeof this.props.isLogout != "undefined" && this.props.isLogout === "false")
            isLogout = false;

        return (
            <Menu secondary style={{ fontWeight: '700', background: 'linear-gradient(2deg,#c4cde5,#ceddf6,#dcecff)' }}>
                <Menu.Item>
                    <img style={{ width: '7.5em' }} src={img} />
                </Menu.Item>
                {isLogout ? <Menu.Menu position='right'>
                    <Menu.Item name='Logout' style={{ color: '#3b5998' }}>
                        <Link to="/logout"> Logout </Link>
                    </Menu.Item>
                </Menu.Menu> : null}
            </Menu>
        )
    }
};


