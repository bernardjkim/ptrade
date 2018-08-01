import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as account from '../redux-modules/actions/accountActions';
import * as stock from '../redux-modules/actions/stockActions';


const mapStateToProps = state => ({
    account: state.account,
    stock: state.stock,
});

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            symbol: '',
        }
    }

    componentWillMount() {
        this.props.dispatch(account.check());
    }

    handleSignOut() {
        this.props.dispatch(account.signOut());
    }

    handleChange(e) {
        let symbol = { ...this.state.symbol };
        symbol = e.target.value;
        this.setState({ symbol: symbol });
    }

    handleSubmit(e) {
        this.props.dispatch(stock.getHistory(this.state.symbol));
        e.preventDefault();
    }


    render() {
        return (
            <Navbar collapseOnSelect>
                <Logo />
                <NavItems
                    isAuthenticated={this.props.account.isAuthenticated}
                    firstName={this.props.account.firstName}
                    handleSignOut={this.handleSignOut}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />
            </Navbar>
        );
    }
}

function Logo(props) {
    return (
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">HOME</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
    );
}

function NavItems(props) {
    return (
        <Navbar.Collapse>
            <Search
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
            />
            <RightMenu
                isAuthenticated={props.isAuthenticated}
                firstName={props.firstName}
                handleSignOut={props.handleSignOut}
            />
        </Navbar.Collapse>
    );
}

function Search(props) {
    return (
        <Navbar.Form pullLeft >
            <Form onSubmit={props.handleSubmit}>

                <FormGroup >
                    <FormControl type='text' placeholder='Search' onChange={props.handleChange}/>
                </FormGroup>{' '}
                <FormGroup>
                    <Button type="submit">Search</Button>
                </FormGroup>
            </Form>
        </Navbar.Form>

    )
}

function RightMenu(props) {
    if (props.isAuthenticated) {
        return (
            <Nav pullRight>
                <NavDropdown eventKey={2} title={props.firstName} id="dropdown-menu">
                    <MenuItem eventKey={2.1} onClick={props.handleSignOut}>Sign Out</MenuItem>
                </NavDropdown>
            </Nav>
        )
    } else {
        return (
            <Nav pullRight>
                <LinkContainer to="/login">
                    <NavItem eventKey={1}>Sign In</NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}

export default connect(mapStateToProps)(Navigation);