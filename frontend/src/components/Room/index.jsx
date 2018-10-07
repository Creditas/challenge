import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import Sender from './Sender';

import styles from './room.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Room extends Component {
  render() {
    const { handleSendMessage, data } = this.props;
    const { id, messages } = data;
    return (
      <div className={styles.room}>
        Room ID: {id}
        <ul>
          {messages.map(message => (
            <Message key={message.id} data={message} />
          ))}
        </ul>
        <Sender handleSendMessage={handleSendMessage} roomId={id} />
      </div>
    );
  }
}

Room.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired
};

export default Room;
