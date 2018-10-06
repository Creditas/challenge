import React, { Component } from 'react';
import { connect } from 'react-redux';

import Room from '../../components/Room';

// eslint-disable-next-line
class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return <Room />;
  }
}

const mapStateToProps = state => {
  return {
    address: state.address
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
