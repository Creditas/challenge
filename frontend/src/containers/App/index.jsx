import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Room from '../../components/Room';
import { sendMessage, addNewRoom } from '../../actions/rooms';
import AddNewHomeButton from '../../components/AddNewHomeButton';
import themeConfig from '../../theme';

import styles from './App.scss';

class App extends Component {
  componentWillMount() {
    const { handleAddRoom: addInitialRoom } = this.props;
    addInitialRoom();
  }

  render() {
    const { roomList, handleSendMessage, handleAddNewRoom } = this.props;
    return (
      <MuiThemeProvider theme={createMuiTheme(themeConfig)}>
        <div className={styles['rooms-wrapper']}>
          {roomList.map(room => (
            <Room key={room.id} data={room} handleSendMessage={handleSendMessage} />
          ))}
          <AddNewHomeButton handleAddNewRoom={handleAddNewRoom} />
        </div>
      </MuiThemeProvider>
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
  handleAddRoom: addNewRoom,
  handleSendMessage: sendMessage,
  handleAddNewRoom: addNewRoom
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
