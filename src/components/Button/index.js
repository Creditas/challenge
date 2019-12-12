import React, {memo} from 'react';
import PropTypes from 'prop-types';

import {ButtonContainer, ButtonText} from './styles';

const Button = ({title, onPress, ...rest}) => {
  return (
    <ButtonContainer onPress={onPress} {...rest}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  margin: PropTypes.any,
};

export default memo(Button);
