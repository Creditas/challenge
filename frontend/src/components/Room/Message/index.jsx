import React from 'react';
import PropTypes from 'prop-types';

import styles from './Message.scss';

const Message = ({ data }) => {
  return (
    <div className={styles.message}>
      <div className={styles.message__content}>{data.content}</div>
    </div>
  ); // TODO - Show user info
};

Message.propTypes = {
  data: PropTypes.any.isRequired
};

export default Message;
