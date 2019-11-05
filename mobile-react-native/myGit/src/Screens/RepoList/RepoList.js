import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Keyboard,
  Animated
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

const HEADER_HEIGHT = 150;
const MAX_SCROLL_OFFSET = HEADER_HEIGHT - 100;
const HEADER_MIN_HEIGHT = 40;

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
    getRepos: () => {},
  }

  state = {
    keyword: ''
  }

  scrollYValue = new Animated.Value(0);

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

    const headerHeight = this.scrollYValue.interpolate(
      {
        inputRange: [0, MAX_SCROLL_OFFSET],
        outputRange: [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
      });

    const inputOpacity = this.scrollYValue.interpolate(
      {
        inputRange: [0, MAX_SCROLL_OFFSET],
        outputRange: [1, 0],
        extrapolate: 'clamp'
      });

    const logoSize = this.scrollYValue.interpolate(
      {
        inputRange: [0, MAX_SCROLL_OFFSET],
        outputRange: [60, 30],
        extrapolate: 'clamp'
      });

    return (
      <DismissKeyboard>
      <Wrapper>
        <StatusBar barStyle="default" />

        <Animated.View style={{ height: headerHeight }}>
          <Logo
            style={{ height: logoSize }}
            source={require('../../Assets/github-logo-full.png')}
          />
          <Animated.View style={{ opacity: inputOpacity }}>
            <SearchInput
              defaultValue={keyword}
              onChange={value => this.onChange(value)}
              placeholder="Repository Search"
            />
          </Animated.View>
        </Animated.View>

        <RepoListScrollView
          isLoading={isLoading}
          getRepos={this.props.getRepos}
          repos={filterByKeyword(repos, keyword)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYValue } } }]
          )}
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
