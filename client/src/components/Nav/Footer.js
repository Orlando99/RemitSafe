import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import TermsAndConditions from '../Registration/Global Registration Page/termsAndConditions';

// Styles
import './index.css';

const footerImg = require('../../assets/images/RemitSafe-logo-dark_small-transparent.png');

export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            modalOpen: false,
        };
    }

    handleOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ modalOpen: true });
    };

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    render() {
        const { modalOpen, checked } = this.state;

        return (
            <div className="footer">
                <div className="container">
                    <div className="ui hidden divider" />
                    <Image
                        style={{
                            margin: '0 auto',
                            width: '150px',
                            height: '30px',
                        }}
                        src={footerImg}
                        className="ui item"
                    />
                    <br />
                    <p style={{ fontSize: '.8em', zIndex: '2' }}>
                        © 2018 RemitSafe Corporation. &nbsp;All rights reserved. &nbsp;Want to&nbsp;&nbsp;
                        <span>
                            <Button
                                style={{
                                    fontSize: '0.95em',
                                    border: 'none',
                                    padding: '0',
                                    background: 'none',
                                    color: 'greenyellow',
                                    textShadow: "(-1px -1px 0 #878e98, 1px -1px #878e98,-1px 1px 0 #878e98, 1px 1px 0 #878e98')"
                                }}
                                as="a"
                                href="http://remitsafe.wpengine.com"
                                target="_blank"
                            >
                                learn more
                            </Button>?&nbsp;&nbsp;
                        </span>
                        
                        <TermsAndConditions
                            fromFooter={true}
                            modalOpen={modalOpen}
                            handleClose={this.handleClose}
                            handleOpen={this.handleOpen}
                            checked={checked}
                        />
                    </p>
                </div>
                <br />
            </div>
        );
    }
}
