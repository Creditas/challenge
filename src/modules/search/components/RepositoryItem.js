import React from 'react';
import PropTypes from 'prop-types';

import {RepositoryItemContainer, RepositoryName} from './styles';
import Label from '../../../components/common/Label';

const RepositoryItem = ({repo, onPress}) => {
  const {name, description} = repo;

  return (
    <RepositoryItemContainer onPress={onPress}>
      <RepositoryName>{name}</RepositoryName>
      {description && <Label dark>{description}</Label>}
    </RepositoryItemContainer>
  );
};

RepositoryItem.propTypes = {
  repo: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RepositoryItem;
