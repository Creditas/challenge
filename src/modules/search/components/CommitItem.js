import React from 'react';
import PropTypes from 'prop-types';
import {CommitItemContainer, CommitMessage, UserAvatar} from './styles';

const CommitItem = ({commit}) => {
  const {
    author,
    commit: {message},
  } = commit;

  return (
    <CommitItemContainer>
      {author && <UserAvatar source={{uri: author.avatar_url}} />}
      <CommitMessage>{message}</CommitMessage>
    </CommitItemContainer>
  );
};

CommitItem.propTypes = {
  commit: PropTypes.object.isRequired,
};

export default CommitItem;
