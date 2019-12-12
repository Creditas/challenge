import React from 'react';

import {searchInputChanged} from '../../../../store/repository/actions';
import {SearchBarContainer, SearchTextInput} from './styles';
import {useDispatch} from 'react-redux';
import SearchIcon from './SearchIcon';

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <SearchBarContainer>
      <SearchTextInput
        placeholder={'Search'}
        onChangeText={value => dispatch(searchInputChanged(value))}
      />
      <SearchIcon />
    </SearchBarContainer>
  );
};

export default SearchBar;
