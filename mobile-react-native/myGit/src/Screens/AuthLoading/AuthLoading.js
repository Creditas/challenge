import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { ROUTES } from '../../Routes/Routes';

import {
  Wrapper,
} from './AuthLoading.style';

export class AuthLoading extends React.Component {
  componentDidMount() {
    const { isLogged, navigation } = this.props;
    if (navigation) {
      navigation.navigate(isLogged ? ROUTES.MAIN : ROUTES.AUTH);
    }
  }

  render() {
    return (
      <Wrapper>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: !!(state.user.user || {}).credential
});

export default connect(
  mapStateToProps,
)(AuthLoading);
