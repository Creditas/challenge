import {createSwitchNavigator} from 'react-navigation';

import MainStack from './MainStack';
import AuthScreen from '../modules/auth/screens/AuthScreen';
import SplashScreen from '../modules/splash/screens/SplashScreen';

const AppNavigator = createSwitchNavigator(
  {
    Main: MainStack,
    Auth: {screen: AuthScreen},
    Splash: {screen: SplashScreen},
  },
  {
    initialRouteName: 'Splash',
  },
);

export default AppNavigator;
