/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import SearchDiv from './SearchDiv';
import SearchIconDiv from './SearchIconDiv';
import StyledInput from './StyledInput';

function SearchBar(props) {
  return (
    <SearchDiv>
      <SearchIconDiv>
        <SearchIcon />
      </SearchIconDiv>
      <form onSubmit={props.handleSubmit}>
        <StyledInput
          placeholder="Search…"
          value={props.search}
          disableUnderline
          onChange={props.handleChange}
        />
      </form>
    </SearchDiv>
  );
}

SearchBar.propTypes = {
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
