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
import { withNavigation } from 'react-navigation';

import { configureLayoutAnimation } from '../../Utils/layoutAnimation';

import RepoListItem from './RepoListItem';
import { Margins } from '../../Styleguide';

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
    getRepos: () => {},
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
    const { repos, onScroll, isLoading } = this.props;

    if (isLoading) {
      return <ActivityIndicator style={{ flex: 1 }} />
    }

    return (
      <ScrollView
        onScrollEndDrag={this.onScrollEndDrag}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {isRefreshing && (
          <Animatable.View animation="fadeIn">
            <ActivityIndicator style={{ margin: Margins.small }} />
          </Animatable.View>
        )}
        {repos.map((repo, index) => (
          <RepoListItem
            key={repo.name}
            repo={repo}
            index={index}
            onPress={() => this.props.navigation.navigate('RepoDetail', { repo })}
          />
        ))}
      </ScrollView>
    );
  }
}

export default withNavigation(RepoListScrollView);
