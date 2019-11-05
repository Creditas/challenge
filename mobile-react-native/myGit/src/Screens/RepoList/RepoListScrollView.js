import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ScrollView,
  Vibration,
  View,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { configureLayoutAnimation } from '../../Utils/layoutAnimation';

import RepoListItem from './RepoListItem';

class RepoListScrollView extends React.Component {
  static propTypes = {
    repos: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })).isRequired,
    getRepos: PropTypes.func.isRequired,
  };

  static defaultProps = {
    repos: [],
  };

  state = {
    isRefreshing: false,
  };

  onScrollEndDrag = (event) => {
    const { contentOffset } = event.nativeEvent;

    if (contentOffset.y < -40 && !this.state.isRefreshing) {
      Vibration.vibrate();
      this.setState({ isRefreshing: true },
        () => setTimeout(() => {
          this.props.getRepos().then(() => {
            this.setState({ isRefreshing: false });
            configureLayoutAnimation();
          });
        }, 1500),
      );
    }
  }

  render() {
    const { isRefreshing } = this.state;
    const { repos, onScroll } = this.props;

    return (
      <ScrollView
        scrollEventThrottle={100}
        onScrollEndDrag={this.onScrollEndDrag}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {isRefreshing && (
          <Animatable.View animation="fadeIn">
            <ActivityIndicator />
          </Animatable.View>
        )}
        {repos.map((repo, index) => (
          <RepoListItem
            key={repo.name}
            repo={repo}
            index={index}
            onPress={() => {}}
          />
        ))}
      </ScrollView>
    );
  }
}

export default RepoListScrollView;
