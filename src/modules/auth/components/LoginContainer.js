import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import * as authSelectors from '../../../store/auth/selectors';
import * as authActions from '../../../store/auth/actions';

import PassForm from './forms/PassForm';
import EmailForm from './forms/EmailForm';
import Loading from '../../../components/Loading';
import {RelativeContainer} from './styles';

const LoginContainer = ({onSubmit}) => {
  const dispatch = useDispatch();
  const username = useSelector(authSelectors.getUsername);
  const email = useSelector(authSelectors.getEmail);
  const loading = useSelector(authSelectors.getLoading);

  const handleEmailSubmit = values => {
    dispatch(authActions.setEmail(values.email));
  };

  return (
    <RelativeContainer>
      <Loading show={loading} />
      {!username && !loading && <EmailForm onSubmit={handleEmailSubmit} />}
      {!!username && !loading && (
        <PassForm
          initialValues={{email, username, pass: ''}}
          onSubmit={onSubmit}
          onBack={() => handleEmailSubmit({email: null})}
        />
      )}
    </RelativeContainer>
  );
};

LoginContainer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginContainer;
