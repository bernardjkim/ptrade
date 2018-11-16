/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';

import SearchDiv from './SearchDiv';
import SearchIconDiv from './SearchIconDiv';
import StyledInput from './StyledInput';

function SearchBar(props) {
  return (
    <SearchDiv>
      <SearchIconDiv>
        <SearchIcon />
      </SearchIconDiv>
      <form onSubmit={e => props.handleSubmit(e, props.search)}>
        <StyledInput
          placeholder="Search…"
          value={props.search ? props.search : ''}
          disableUnderline
          onChange={props.handleChange}
        />
      </form>
    </SearchDiv>
  );
}

SearchBar.propTypes = {
  // variables
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // functions
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
