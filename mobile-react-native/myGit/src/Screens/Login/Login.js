import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Alert,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

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

const Login = ({ navigation }) => {
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isFocussed, setFocus ] = useState(false);

  // Solução muito legal, mas infelizmente executa ao mesmo tempo KeyboardAvoidingView causando warning (talvez problemas de performance).
  configureLayoutAnimation();

  onClickNext = () => userAddEmail({ dispatch })({ email });
  onClickBack = () => dispatch({ type: Types.LOGIN_RESET });
  onClickLogin = () => userLogin({ dispatch })({ email: userState.email, password, navigation });
  onFocus = () => setFocus(true);
  onBlur = () => setFocus(false);

  return (
    <DismissKeyboard>
    <Wrapper>
      <AnimatedLoginLogo
        source={require('../../Assets/github-logo.png')}
        animation={isFocussed ? 'fadeOutUp' : 'fadeInDown' }
        useNativeDriver
      />

      {!!userState.error && (
        <AnimatedLoginError animation="slideInDown">
          <Text>{userState.error}</Text>
        </AnimatedLoginError>
      )}

      <LoginFormWrapper behavior="position" enabled>
        {userState.email ? (
          <React.Fragment>
            <LoginText>{userState.email}</LoginText>

            <LoginInput
              onChange={value => setPassword(value.nativeEvent.text)}
              secureTextEntry
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onTouchCancel
            />
            <LoginButton title="Login" onPress={this.onClickLogin} />
            <LoginButton title="Back" onPress={this.onClickBack} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <LoginInput
              onChange={value => setEmail(value.nativeEvent.text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
            <LoginButton title="Next" onPress={this.onClickNext} />
          </React.Fragment>
        )}
      </LoginFormWrapper>
      {!!userState.dsadsa && <LoginButton title="Back" onPress={this.onClickBack} />}
    </Wrapper>
    </DismissKeyboard>
  )
}

export default Login;
