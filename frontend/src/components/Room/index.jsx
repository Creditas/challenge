import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import Message from './Message';
import Sender from './Sender';

import styles from './room.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Room extends Component {
  render() {
    const { handleSendMessage, data } = this.props;
    const { id, messages } = data;
    return (
      <Paper className={styles.room}>
        <div className={styles.room__header}>
          <span>Room ID: </span>
          {id.substring(0, 7)}
        </div>
        <div className={styles['room__message-container']}>
          {messages.map(message => (
            <Message key={message.id} data={message} />
          ))}
        </div>
        <div className={styles.room__sender}>
          <Sender handleSendMessage={handleSendMessage} roomId={id} />
        </div>
      </Paper>
    );
  }
}

Room.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired
};

export default Room;
