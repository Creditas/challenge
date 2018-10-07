/* eslint-disable */
import React from 'react';
import Message from './Message';
import Sender from './Sender';

import styles from './room.scss';

const Room = props => {
  return (
    <div className={styles.room}>
      Room ID: {props.data.id}
      {props.data.messages.map(message => <Message key={message.id} data={message} /> )}
      <Sender handleSendMessage={props.handleSendMessage} roomId={props.data.id}/>
    </div>
  );
};

export default Room;
