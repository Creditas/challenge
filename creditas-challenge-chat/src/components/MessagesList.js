import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";

const MessagesList = ({ messages, selectedRoomId }) => (
  <section id="messages-list">
      {messages
        .filter(message => message.room_id === selectedRoomId)
        .map(message => (
          <Message key={message.id} {...message} />
        ))}
  </section>
);

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      room_id: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  selectedRoomId: PropTypes.number.isRequired
};

export default MessagesList;
