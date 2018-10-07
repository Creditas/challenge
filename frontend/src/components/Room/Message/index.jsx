import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ data }) => {
  return <li>{data.content}</li>; // TODO - Show user info
};

Message.propTypes = {
  data: PropTypes.any.isRequired
};

export default Message;
