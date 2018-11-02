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

import SearchBar from 'components/SearchBar';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import StyledAppBar from './StyledAppBar';

const Grow = styled.div`
  flex-grow: 1;
`;

/* eslint-disable react/prefer-stateless-function */
function TopBar(props) {
  return (
    <StyledAppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="title" color="inherit">
          PTrade
        </Typography>
        <SearchBar
          search={props.search}
          handleSubmit={props.handleSubmit}
          handleChange={props.handleChange}
        />
        <Grow />
        <Button color="inherit">
          <Typography variant="subheading" color="inherit" noWrap>
            Sign in
          </Typography>
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
}

TopBar.propTypes = {
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TopBar;
