import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import * as authSelectors from '../../../store/auth/selectors';

import {loginRequested} from '../../../store/auth/actions';
import Logo from '../components/Logo';
import LogoImg from '../../../assets/images/LogoImg.png';
import ScreenContainer from '../../../components/common/ScreenContainer';
import LoginContainer from '../components/LoginContainer';

const AuthScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setShowLogo(false));
    Keyboard.addListener('keyboardDidHide', () => setShowLogo(true));
    return () => {
      Keyboard.removeAllListeners('keyboardWillShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('Main');
    }
  }, [user]);

  return (
    <ScreenContainer>
      <Logo show={showLogo} source={LogoImg} />
      <LoginContainer
        onSubmit={credentials => dispatch(loginRequested(credentials))}
      />
    </ScreenContainer>
  );
};

export default AuthScreen;
