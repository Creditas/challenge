import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Alert,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import I18n from '../../I18n/I18n';

import DismissKeyboard from '../../Components/DismissKeyboard';

import { configureLayoutAnimation } from '../../Utils/layoutAnimation';
import { Types, userLogin, userAddEmail, userReset } from '../../Store/Ducks/user';

import {
  Wrapper,
  LoginLogo,
  LoginFormWrapper,
  LoginInput,
  LoginButton,
  LoginText,
  LoginError,
} from './Login.style';

const AnimatedLoginLogo = Animatable.createAnimatableComponent(LoginLogo);
const AnimatedLoginError = Animatable.createAnimatableComponent(LoginError);

const scaleOut = {
  style: {
    top: 0
  },
  0: {
    opacity: 0.8,
    scale: 0.3,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const scaleIn = {
  style: {
    position: Platform.OS !== 'android' ? 'absolute' : 'relative',
    top: 0
  },
  0: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 0.8,
    scale: 0.3,
  },
};

const Login = ({ navigation }) => {
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isFocussed, setFocus ] = useState(false);
  const keyboardBehvior = Platform.OS === 'android' ? 'padding' : 'position';

  // Solução muito legal, mas infelizmente executa ao mesmo tempo KeyboardAvoidingView causando warning (talvez problemas de performance).
  configureLayoutAnimation();

  onClickNext = () => userAddEmail({ dispatch })({ email });
  onClickBack = () => {
    dispatch({ type: Types.LOGIN_RESET });
    setFocus(false);
  }
  onClickLogin = () => userLogin({ dispatch })({ email: userState.email, password, navigation });
  onFocus = () => setFocus(true);
  onBlur = () => setFocus(false);

  return (
    <DismissKeyboard>
    <Wrapper>
      <AnimatedLoginLogo
        source={require('../../Assets/github-logo.png')}
        animation={isFocussed ? scaleIn : scaleOut }
        useNativeDriver
      />

      {!!userState.error && (
        <AnimatedLoginError animation="slideInDown">
          <Text>{userState.error}</Text>
        </AnimatedLoginError>
      )}

      <LoginFormWrapper behavior={keyboardBehvior}>
        {userState.email ? (
          <React.Fragment>
            <LoginText>{userState.email}</LoginText>

            <LoginInput
              placeholder={I18n.t('password')}
              onChange={value => setPassword(value.nativeEvent.text)}
              secureTextEntry
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              autoFocus
            />
            <LoginButton title={I18n.t('login')} onPress={this.onClickLogin} />
            <LoginButton title={I18n.t('back')} onPress={this.onClickBack} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <LoginInput
              placeholder={I18n.t('email')}
              onChange={value => setEmail(value.nativeEvent.text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
            <LoginButton title={I18n.t('next')} onPress={this.onClickNext} />
          </React.Fragment>
        )}
      </LoginFormWrapper>
    </Wrapper>
    </DismissKeyboard>
  )
}

export default Login;
