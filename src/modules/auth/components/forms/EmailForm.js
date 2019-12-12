import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import {FormContainer} from '../styles';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/inputs/TextInput';
import Label from '../../../../components/common/Label';
import {useSelector} from 'react-redux';
import * as authSelectors from '../../../../store/auth/selectors';

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required field'),
});

const EmailForm = ({onSubmit}) => {
  const error = useSelector(authSelectors.getError);

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={emailSchema}
      onSubmit={onSubmit}>
      {({handleSubmit, isSubmitting, ...props}) => (
        <FormContainer animation={'fadeInUp'}>
          {error && <Label error>{error}</Label>}
          <TextInput
            placeholder={'Email'}
            name={'email'}
            autoCompleteType={'email'}
            onSubmitEditing={handleSubmit}
            {...props}
          />
          <Button onPress={handleSubmit} title="Next" primary />
        </FormContainer>
      )}
    </Formik>
  );
};

EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EmailForm;
