import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

import Message from './Message';
import Sender from './Sender';

import styles from './room.scss';

class Room extends Component {
  constructor(props) {
    super(props);
    this.messageWrapperRef = React.createRef();
  }

  addNewMessage = (roomId, message) => {
    const { handleSendMessage } = this.props;
    handleSendMessage(roomId, message);
    setTimeout(() => {
      this.messageWrapperRef.current.scrollTop = this.messageWrapperRef.current.scrollHeight;
    }, 100); // Timeout needed to wait until the dom have the final height of the new message
  };

  render() {
    const { data } = this.props;
    const { id, messages } = data;
    return (
      <Grow in>
        <Paper className={styles.room}>
          <div className={styles.room__header}>
            <span>Room ID: </span>
            {id.substring(0, 7)}
          </div>
          <div className={styles['room__message-container']} ref={this.messageWrapperRef}>
            {messages.map(message => (
              <Message key={message.id} data={message} />
            ))}
          </div>
          <div className={styles.room__sender}>
            <Sender handleSendMessage={this.addNewMessage} roomId={id} />
          </div>
        </Paper>
      </Grow>
    );
  }
}

Room.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired
};

export default Room;
