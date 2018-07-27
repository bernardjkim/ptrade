import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as account from '../actions/accountActions';


const mapStateToProps = state => ({
    account: state.account,
});

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
        this.props.dispatch(account.signOut());
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">HOME</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <RightMenu 
                    isAuthenticated={this.props.account.isAuthenticated} 
                    firstName={this.props.account.firstName} 
                    handleSignOut={this.handleSignOut}
                    />
                </Nav>
            </Navbar>
        );
    }
}

function RightMenu(props) {
    if (props.isAuthenticated) {
        return (
            <NavDropdown eventKey={2} title={props.firstName} id="dropdown-menu">
                <MenuItem eventKey={2.1} onClick={props.handleSignOut}>Sign Out</MenuItem>
            </NavDropdown>
        )
    } else {
        return (
            <LinkContainer to="/login">
                <NavItem eventKey={1}>Sign In</NavItem>
            </LinkContainer>
        )
    }
}

export default connect(mapStateToProps)(Navigation);