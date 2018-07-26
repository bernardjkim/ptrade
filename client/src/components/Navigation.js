import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Cookie from 'universal-cookie';

const cookies = new Cookie();

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut() {
        cookies.remove("api.example.com");
        this.props.authenticate();
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

                    {this.props.isAuthenticated ?
                        (

                            <NavDropdown eventKey={2} title={this.props.firstName} id="dropdown-menu">
                                <MenuItem eventKey={2.1} onClick={this.handleSignOut}>Sign Out</MenuItem>
                            </NavDropdown>

                        ) : (
                            <LinkContainer to="/login">
                                <NavItem eventKey={1}>Sign In</NavItem>
                            </LinkContainer>

                        )
                    }

                </Nav>
            </Navbar>
        );
    }
}

export default Navigation;