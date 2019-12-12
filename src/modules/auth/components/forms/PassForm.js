import React from 'react';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {FormContainer} from '../styles';

import * as authSelectors from '../../../../store/auth/selectors';

import Button from '../../../../components/Button';
import TextInput from '../../../../components/inputs/TextInput';
import Label from '../../../../components/common/Label';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required field'),
  pass: Yup.string()
    .required('Required field'),
});

const PassForm = ({onSubmit, onBack, initialValues}) => {
  const error = useSelector(authSelectors.getError);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={onSubmit}>
      {({handleSubmit, isSubmitting, ...props}) => (
        <FormContainer animation={'fadeInUp'}>
          {error && <Label error>{error}</Label>}
          <Label dark>{props.values.email}</Label>
          <TextInput
            placeholder={'Password'}
            name={'pass'}
            secureTextEntry={true}
            onSubmitEditing={handleSubmit}
            {...props}
          />
          <Button onPress={handleSubmit} title="Login" primary/>
          <Button onPress={onBack} title="Back" error margin/>
        </FormContainer>
      )}
    </Formik>
  );
};

PassForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default PassForm;
