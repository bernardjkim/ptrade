import React, { Component } from 'react';
import {
    Button,
    Input,
    NavbarBrand,
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    InputGroup,
    InputGroupAddon,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    NavLink,
    Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as account from 'redux-modules/actions/accountActions';
import * as stock from 'redux-modules/actions/stockActions';

const mapStateToProps = state => ({
    isAuthenticated: state.account.isAuthenticated,
    name: state.account.firstName,
    symbol: state.stock.symbol,
});

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this
            .handleSignOut
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.toggle = this
            .toggle
            .bind(this);

        this.state = {
            isOpen: false
        }
    }

    componentWillMount() {
        this
            .props
            .dispatch(account.check());
    }

    handleSignOut() {
        this
            .props
            .dispatch(account.signOut());
    }

    handleSubmit(symbol) {
        if (this.props.symbol !== symbol) {
            this.props.dispatch(stock.getOneDay(symbol));
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="light" light expand="md">
                <div className="container">
                    <Brand />
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="d-flex justify-content-between w-100 m-auto" navbar>
                            <Search handleSubmit={this.handleSubmit} />
                            <AccountMenu
                                isAuthenticated={this.props.isAuthenticated}
                                name={this.props.name}
                                handleSignOut={this.handleSignOut} />
                        </Nav>
                    </Collapse>
                </div>

            </Navbar>
        );
    }
}

function Brand() {
    return (
        <NavbarBrand tag={Link} to="/" className="d-flex align-items-center mr-auto">
            HOME
        </NavbarBrand>
    )
}

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { value: '' };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleSubmit(e) {
        // Handle submit in parent component
        e.preventDefault();
        this.props.handleSubmit(this.state.value)
    }

    render() {
        return (
            <NavItem className="d-flex align-items-center">
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input type='text' placeholder='Search' onChange={this.handleChange} />
                        <InputGroupAddon addonType="append">
                            <Button type="submit">Search</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            </NavItem>
        )
    }
}

function AccountMenu(props) {

    if (props.isAuthenticated) {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    {props.name}
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        Profile
                        </DropdownItem>
                    <DropdownItem>
                        Settings
                        </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={props.handleSignOut}>
                        Sign Out
                        </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    } else {
        return (
            <NavItem>
                <NavLink tag={Link} to="/login">
                    Sign In
                </NavLink>
            </NavItem>
        )
    }
}

export default connect(mapStateToProps)(Navigation);