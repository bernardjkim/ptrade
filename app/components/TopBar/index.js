/**
 *
 * TopBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// import { SigninLink } from 'containers/SigninPage/index';
import SearchBar from 'components/SearchBar';
import UserMenu from 'components/UserMenu';
import StyledAppBar from './StyledAppBar';

const Grow = styled.div`
  flex-grow: 1;
`;

/* eslint-disable react/prefer-stateless-function */
function TopBar(props) {
  return (
    <StyledAppBar position="static" color="inherit">
      <Toolbar>
        <Typography color="inherit">PTrade</Typography>
        <SearchBar
          search={props.search}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
        />
        <Grow />
        {props.token ? (
          <UserMenu
            handleSignout={props.handleSignout}
            profileLink={props.profileLink}
          />
        ) : (
          <Button component={props.signinLink} color="inherit">
            <Typography color="inherit">Sign in</Typography>
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}

TopBar.propTypes = {
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSignout: PropTypes.func.isRequired,
  signinLink: PropTypes.func.isRequired,
  profileLink: PropTypes.func.isRequired,
};

export default TopBar;
