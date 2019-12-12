import React from 'react';

import ScreenContainer from '../../../components/common/ScreenContainer';
import Header from '../../../components/common/Header';
import SearchBar from '../components/SearchBar';
import RepositoryList from '../components/RepositoryList';

const SearchScreen = () => {
  return (
    <ScreenContainer>
      <Header />
      <SearchBar />
      <RepositoryList />
    </ScreenContainer>
  );
};

export default SearchScreen;
