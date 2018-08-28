import React, { Component } from 'react';
import {
    NavbarBrand,
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    NavLink,
} from 'reactstrap';
import StockSearchBar from './StockSearchBar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as account from 'redux-modules/actions/accountActions';
import * as stock from 'redux-modules/actions/stockActions';
import * as referenceData from 'redux-modules/actions/referenceDataActions';

const mapStateToProps = state => ({
    isAuthenticated: state.account.isAuthenticated,
    name: state.account.firstName,
    symbol: state.stock.symbol,
    referenceDataSymbols: state.referenceData.dataSymbols
});

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        this.props.dispatch(referenceData.getSymbols());
    }

    componentWillMount() {
        this.props.dispatch(account.check());
    }

    handleSignOut() {
        this.props.dispatch(account.signOut());
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
            <Navbar className="rounded-0 zindex-front" color="dark" dark expand="md">
                <div className="container">
                    <Brand />
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="d-flex justify-content-between w-100 m-auto" navbar>
                            <StockSearchBar handleSubmit={this.handleSubmit} autocompleteData={this.props.referenceDataSymbols} />
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