import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import DismissKeyboard from '../../Components/DismissKeyboard';

import RepoListScrollView from './RepoListScrollView';
import SearchInput from '../../Components/SearchInput';

import { configureLayoutAnimation } from '../../Utils/layoutAnimation';
import { getRepos } from '../../Store/Ducks/repository';
import { filterByKeyword } from '../../Utils/repoFilter';

import {
  Wrapper,
  Logo,
} from './RepoList.style';

export class RepoList extends React.Component {
  static propTypes = {
    repos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })),
    getRepos: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  }

  static defaultProps = {
    isLoading: false,
    repos: [],
  }

  state = {
    keyword: ''
  }

  componentDidMount() {
    this.props.getRepos();
  }

  // Search keyword (debounce com 400ms)
  onSearch(keyword) {
    clearTimeout(this.typeKeywordDebounce);

    this.typeKeywordDebounce = setTimeout(() => {
      configureLayoutAnimation();
      this.setState({ keyword });
    }, 300)
  }

  onChange(value) {
    if (!value) {
      Keyboard.dismiss();
    }
    this.onSearch(value.nativeEvent ? value.nativeEvent.text : value);
  }

  render() {
    const { repos, isLoading } = this.props;
    const { keyword } = this.state;

    return (
      <DismissKeyboard>
      <Wrapper>
        <StatusBar barStyle="default" />
        <Logo source={require('../../Assets/github-logo-full.png')} />
        <SearchInput
          defaultValue={keyword}
          onChange={value => this.onChange(value)}
          placeholder="Repository Search"
        />
        <RepoListScrollView
          isLoading={isLoading}
          getRepos={this.props.getRepos}
          repos={filterByKeyword(repos, keyword)}
        />
      </Wrapper>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.repository.repos || [],
  isLoading: state.repository.loading,
});

const mapDispatchToProps = {
  getRepos,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoList);
