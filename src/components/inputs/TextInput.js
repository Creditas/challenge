import React from 'react';
import {TextInput} from 'react-native';
import PropTypes from 'prop-types';

import theme from '../theme';
import {FormGroup, InputHolder} from './styles';
import Label from '../common/Label';

const Input = props => {
  const {
    name,
    placeholder,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    ...rest
  } = props;
  const hasError = touched[name] && errors[name] !== undefined;
  const color = hasError ? theme.colors.error : theme.colors.dark;

  return (
    <FormGroup>
      <InputHolder error={hasError}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={color}
          style={{color}}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          error={errors[name]}
          touched={touched[name]}
          value={values[name]}
          {...rest}
        />
      </InputHolder>
      {hasError ? <Label error>{errors[name]}</Label> : <Label />}
    </FormGroup>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
