import React from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';

import styles from './Message.scss';

const Message = ({ data }) => {
  return (
    <Grow in>
      <div className={styles.message}>
        <div className={styles.message__content}>{data.content}</div>
      </div>
    </Grow>
  ); // TODO - Show user info
};

Message.propTypes = {
  data: PropTypes.any.isRequired
};

export default Message;
