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
import * as account from '../redux-modules/actions/accountActions';
import * as stock from '../redux-modules/actions/stockActions';

const mapStateToProps = state => ({account: state.account, stock: state.stock});

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleSignOut = this
            .handleSignOut
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.toggle = this
            .toggle
            .bind(this);

        this.state = {
            symbol: '',
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

    handleChange(e) {
        let symbol = {
            ...this.state.symbol
        };
        symbol = e.target.value;
        this.setState({symbol: symbol});
    }

    handleSubmit(e) {
        this
            .props
            .dispatch(stock.getHistory(this.state.symbol));
        e.preventDefault();
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
                <NavbarBrand className="d-flex align-items-center mr-auto" href="/">HOME</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="d-flex justify-content-between w-100" navbar>
                        <NavItem className="d-flex align-items-center">
                            <InputGroup>
                                <Input type='text' placeholder='Search' onChange={this.handleChange}/>
                                <InputGroupAddon addonType="append">
                                    <Button type="submit">Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </NavItem>
                        <NavItem>
                            {this.props.account.isAuthenticated
                                ? <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            {this.props.account.firstName}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem>
                                                Profile
                                            </DropdownItem>
                                            <DropdownItem>
                                                Settings
                                            </DropdownItem>
                                            <DropdownItem divider/>
                                            <DropdownItem onClick={this.handleSignOut}>
                                                Sign Out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                : <NavLink href="/login">Sign In</NavLink>}
                        </NavItem>
                    </Nav>
                </Collapse>
                    </div>
                
            </Navbar>
        );
    }
}

export default connect(mapStateToProps)(Navigation);