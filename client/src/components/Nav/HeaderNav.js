import React, { Component } from 'react';
import {
    Button, Image, Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';
import { signOut } from '../awshelper';

// Styles
import './index.css';

const imgSrc = require('../../assets/images/RemitSafe-logo-dark_small-transparent.png');

export default class HeaderNav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    handleHome = () => {
        const { router } = this.context;
        router.history.push('/admin');
    }

    vendorClick = () => {
        const { router } = this.context;
        router.history.push('vendor');
    }

    buyerClick = () => {
        const { router } = this.context;
        router.history.push('buyer');
    }

    onIdle = () => {
        signOut();
        const { router } = this.context;
        router.history.push('/');
    }

    onLogout = () => {

    }

    menuClickHandler = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    render() {
        const { isHome } = this.props;
        const { isOpen } = this.state;

        return (
            <IdleTimer
                ref="idleTimer"
                element={document}
                idleAction={this.onIdle}
            >
                <div className="ui grid header-nav">
                    <div className="computer tablet only row">
                        <div className="ui menu navbar container">
                            <Link to="/">
                                <Image src={imgSrc} className="logo" />
                                <br />
                            </Link>
                            <div className="right menu">
                                {isHome ? null : <Button primary onClick={this.handleHome}>Dashboard</Button>}&nbsp; &nbsp; &nbsp;
                                <Button primary onClick={this.vendorClick}>My Vendors</Button>&nbsp; &nbsp; &nbsp;
                                <Button primary onClick={this.buyerClick}>My Buyers</Button>&nbsp; &nbsp; &nbsp;
                                <Button primary href="http://remitsafe.wpengine.com" target="_blank"> About </Button> &nbsp; &nbsp; &nbsp;
                                <Link to="/logout" className="linkhover" title="Logout"> <Icon name="sign out" size="huge" color="teal" /> </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mobile only narrow row">
                        <div className="ui navbar menu container">
                            <Link to="/">
                                <Image src={imgSrc} className="logo" />
                                <br />
                            </Link>
                            <div className="right menu open">
                                <button type="button" className="menu item" onClick={this.menuClickHandler}>
                                    <i className="align justify icon" />
                                </button>
                            </div>
                        </div>
                        {
                            isOpen
                                ? (
                                    <div className="ui vertical navbar menu">
                                        {isHome ? null : <Button primary onClick={this.handleHome}>Dashboard</Button>}&nbsp; &nbsp; &nbsp;
                                        <Button primary onClick={this.vendorClick}>My Vendors</Button>&nbsp; &nbsp; &nbsp;
                                        <Button primary onClick={this.buyerClick}>My Buyers</Button>&nbsp; &nbsp; &nbsp;
                                        <Button primary href="http://remitsafe.wpengine.com" target="_blank"> About </Button> &nbsp; &nbsp; &nbsp;
                                        <Link to="/logout" className="linkhover" title="Logout"> <Icon name="sign out" size="huge" color="teal" /> </Link>
                                    </div>
                                )
                                : null
                        }

                    </div>
                </div>
            </IdleTimer>
        );
    }
}

HeaderNav.propTypes = {
    isHome: PropTypes.bool,
};

HeaderNav.contextTypes = {
    router: PropTypes.object.isRequired,
};
