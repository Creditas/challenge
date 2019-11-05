import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';

import RepoListScrollView from './RepoListScrollView';

import { getRepos } from '../../Store/Ducks/repository';

import {
  Wrapper,
  RepoLogo,
} from './RepoList.style';

export class RepoList extends React.Component {
  static propTypes = {
    repos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })),
    getRepos: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
  }

  static defaultProps = {
    isLoading: false,
    repos: [],
    getRepos: () => {}
  }

  state = {
    keyword: ''
  }

  componentDidMount() {
    this.props.getRepos();
  }

  onSearch(keyword) {
    this.setState({ keyword });
  }

  getFilteredRepos(repos) {
    const { keyword } = this.state;
    if (repos.length) {
      return repos.filter(repo => (repo.name.toLowerCase()).includes(keyword.toLowerCase()))
    }
    return repos;
  }

  render() {
    const { repos, isLoading } = this.props;

    return (
      <Wrapper>
        <StatusBar barStyle="default" />
        <RepoLogo source={require('../../Assets/github-logo-full.png')} />
        <TextInput
          onChange={event => this.onSearch(event.nativeEvent.text)}
          placeholder="Repository Search"
          style={{ borderWidth: 1, borderRadius: 4, width: '100%', padding: 8, marginBottom: 40 }} />
        <RepoListScrollView
          isLoading={isLoading}
          getRepos={this.props.getRepos}
          repos={this.getFilteredRepos(repos)}
        />
      </Wrapper>
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
