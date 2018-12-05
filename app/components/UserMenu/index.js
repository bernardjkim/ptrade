/**
 *
 * UserMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

/* eslint-disable react/prefer-stateless-function */
class UserMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  // Open menu popup
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  // Close menu popup
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  signout = () => {
    this.handleClose();
    this.props.handleSignout();
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'user-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={this.handleClose}
            component={this.props.profileLink}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.signout}>Sign out</MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  handleSignout: PropTypes.func.isRequired,
  profileLink: PropTypes.func.isRequired,
};

export default UserMenu;
