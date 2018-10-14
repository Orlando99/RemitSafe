import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Image, Message, Menu, Button } from 'semantic-ui-react'
import { signOut } from '../awshelper';
import PropTypes from 'prop-types';
const srcAd = "../../../images/ad-1-nowaccount.png";

export default class Logout extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        localStorage.clear();
        signOut();
        this.context.router.history.push("/");
    }
    render() {
        return (
            <div>
                <div className="ui hidden divider" />
                <div className="ui container">
                    <h4 className="ui header center">
                        Thank you for using RemitSafe&trade;
                        
                    </h4>
                    <div className="ui hidden divider" />

                    <div className="ui hidden divider" />
                    <div className="ui hidden divider" />
                </div>
                <br /><br />
                <div className="center ui.big.search">
                    <Link to="/" >Login</Link>
                </div>
                <div className="ui hidden divider" />
                <div className="ui hidden divider" />
                <div style={{ background: '#878e98' }} className="ui inverted center aligned footer segment">
                    <div className="container">
                        <div className="ui hidden divider" />
                        <Image
                            style={{ margin: "0 auto", width: "150px", height: "30px" }}
                            src='../images/RemitSafe-logo-dark_small-transparent.png'
                            className={"ui item"} />
                        <br />
                        <p style={{ fontSize: '.8em' }}>Copyright © 2010-2018 NOWaccount Network Corporation. All rights
                            reserved. Want to <span>
                                <Button
                                    style={{ fontSize: '0.95em', border: 'none', padding: '0', background: 'none', color: 'greenyellow', textShadow: "(-1px -1px 0 #878e98, 1px -1px #878e98,-1px 1px 0 #878e98, 1px 1px 0 #878e98')", fontWeight: '700' }}
                                    as='a'
                                    href=''
                                    target='_blank'
                                > learn more </Button>?</span></p>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}
Logout.contextTypes = {
    router: PropTypes.object.isRequired
};
