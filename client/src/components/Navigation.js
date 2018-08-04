import React, {Component} from 'react';
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
    NavLink
} from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as account from 'redux-modules/actions/accountActions';
import * as stock from 'redux-modules/actions/stockActions';

const mapStateToProps = state => ({
    isAuthenticated: state.account.isAuthenticated,
    name: state.account.firstName,
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

    handleSubmit(value) {
        this
            .props
            .dispatch(stock.getHistory(value));
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
                    <Brand/>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="d-flex justify-content-between w-100" navbar>
                            <Search handleSubmit={this.handleSubmit}/>
                            <AccountMenu 
                                isAuthenticated={this.props.isAuthenticated}
                                name={this.props.name}
                                handleSignOut={this.handleSignOut}/>
                        </Nav>
                    </Collapse>
                </div>
                
            </Navbar>
        );
    }
}

function Brand() {
    // TODO: handle the nested link elements
    return (
        <NavbarBrand className="d-flex align-items-center mr-auto">
            <Link to="/">
                HOME
            </Link>
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
        this.setState({value: e.target.value});
    }

    handleSubmit() {
        // Handle submit in parent component
        this.props.handleSubmit(this.state.value)
    }

    render() {
        return (
            <NavItem className="d-flex align-items-center">
                <InputGroup>
                    <Input type='text' placeholder='Search' onChange={this.handleChange}/>
                    <InputGroupAddon addonType="append">
                        <Button type="submit" onClick={this.handleSubmit}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
            </NavItem>
        )
    }
}

function AccountMenu(props) {

    if (props.isAuthenticated) {
        return (
            <NavItem>
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
                        <DropdownItem divider/>
                        <DropdownItem onClick={props.handleSignOut}>
                            Sign Out
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
        )
    } else {
        // TODO: handle the nested link elements
        return(
            <NavItem>
                <NavLink href="#">
                    <Link to ="/login">
                        Sign In
                    </Link>
                </NavLink>
            </NavItem>
        )
    }
}

export default connect(mapStateToProps)(Navigation);