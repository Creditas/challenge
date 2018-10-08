import React from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';

import styles from './Message.scss';
import audio from './notification.mp3';

// eslint-disable-next-line
class Message extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Grow in>
        <div className={styles.message}>
          <audio src={audio} autoPlay>
            <track kind="captions" />
          </audio>
          <div className={styles.message__content}>{data.content}</div>
        </div>
      </Grow>
    ); // TODO - Show user info somehow
  }
}

Message.propTypes = {
  data: PropTypes.any.isRequired
};

export default Message;
