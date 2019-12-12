import React, {useEffect} from 'react';
import {View} from 'react-native';
import RNSplashScreen from 'react-native-splash-screen';
import {baseSetupAxios} from '../../../helpers/http';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    baseSetupAxios();
    navigation.navigate('Auth');

    RNSplashScreen.hide();
  }, []);

  return <View />;
};

export default SplashScreen;
