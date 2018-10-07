import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Room from '../../components/Room';
import { getRoom, sendMessage, addNewRoom } from '../../actions/rooms';

class App extends Component {
  componentWillMount() {
    const { handleAddRoom: addInitialRoom } = this.props;
    addInitialRoom();
  }

  render() {
    const { roomList, handleSendMessage, handleAddNewRoom } = this.props;
    return (
      <React.Fragment>
        {roomList.map(room => (
          <Room key={room.id} data={room} handleSendMessage={handleSendMessage} />
        ))}
        <button type="button" onClick={handleAddNewRoom}>
          Novo Chat {/* TODO add 118n */}
        </button>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  roomList: PropTypes.array.isRequired,
  handleAddRoom: PropTypes.func.isRequired,
  handleSendMessage: PropTypes.func.isRequired,
  handleAddNewRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    roomList: state.rooms.list
  };
};

const mapDispatchToProps = {
  handleAddRoom: getRoom,
  handleSendMessage: sendMessage,
  handleAddNewRoom: addNewRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
