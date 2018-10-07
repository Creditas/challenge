import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Room from '../../components/Room';
import { getRoom, sendMessage } from '../../actions/rooms';

class App extends Component {
  componentWillMount() {
    const { handleAddRoom: addInitialRoom } = this.props;
    addInitialRoom();
    addInitialRoom();
  }

  render() {
    const { roomList, handleSendMessage } = this.props;
    return roomList.map(room => (
      <Room key={room.id} data={room} handleSendMessage={handleSendMessage} />
    ));
  }
}

App.propTypes = {
  roomList: PropTypes.array.isRequired,
  handleAddRoom: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    roomList: state.rooms.list
  };
};

const mapDispatchToProps = {
  handleAddRoom: getRoom,
  handleSendMessage: sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
