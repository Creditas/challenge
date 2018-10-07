import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Room from '../../components/Room';

// eslint-disable-next-line
class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    const { rooms } = this.props;
    return rooms.map(room => <Room data={room} />);
  }
}

App.propTypes = {
  rooms: PropTypes.arrayOf().isRequired
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms.list
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
