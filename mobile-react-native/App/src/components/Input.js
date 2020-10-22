import React from 'react';
import styled from '@emotion/native';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { color, space, border, typography } from 'styled-system';

const StyledInput = styled.TextInput(typography, border, color, space);

const Input = ({ placeholder, value, onChangeText, ...rest }) => {
  const theme = useTheme();
  return (
    <StyledInput
      placeholderTextColor={theme.colors.primary}
      color="primary"
      borderRadius={1}
      borderWidth={1}
      borderColor="border"
      textAlign="center"
      fontSize="sm"
      fontWeight="bold"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      height={30}
      py="0"
      {...rest}
    />
  );
};

Input.propTypes = {
  /**
   * Placeholder of theinput
   */
  placeholder: PropTypes.string,
  /**
   * Vaue of theinput
   */
  value: PropTypes.string,
  /**
   * Function to execute on typing in input text
   */
  onChangeText: PropTypes.func.isRequired,
};

Input.defaultProps = {
  onChangeText: () => {},
};

export default Input;
