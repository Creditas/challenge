import React from 'react';
import styled from '@emotion/native';
import PropTypes from 'prop-types';
import {
  color,
  flexbox,
  layout,
  space,
  position,
  border,
  typography,
} from 'styled-system';

const StyledButton = styled.TouchableOpacity(
  layout,
  color,
  space,
  flexbox,
  position,
  border,
  typography
);

const StyledLabel = styled.Text(typography);

const Button = ({ label, onPress, ...rest }) => (
  <StyledButton
    py="1"
    px="3"
    justifyContent="center"
    alignItems="center"
    borderRadius={1}
    borderWidth={1}
    borderColor="border"
    onPress={onPress}
    {...rest}
  >
    <StyledLabel fontSize="md" fontWeight="md">
      {label}
    </StyledLabel>
  </StyledButton>
);

Button.propTypes = {
  /**
   * Label of the button
   */
  label: PropTypes.string.isRequired,
  /**
   * Function to execute on touch in button
   */
  onPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  label: '',
  onPress: () => {},
};

export default Button;
