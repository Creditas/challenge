import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../Screens/Login/Login';
import AuthLoading from '../Screens/AuthLoading/AuthLoading';
import RepoList from '../Screens/RepoList/RepoList';
import RepoDetail from '../Screens/RepoDetail/RepoDetail';

import { ROUTES } from './Routes';

const AuthStack = createStackNavigator(
  { [ROUTES.LOGIN]: Login },
  { mode: 'modal',
    headerMode: 'none',
  }
);

const MainStack = createStackNavigator(
  { [ROUTES.REPO_LIST]: RepoList,
    [ROUTES.REPO_DETAIL]: RepoDetail,
  },
  { headerMode: 'none' }
);

// AuthFlow baseado no get started do react-navigation
// (https://reactnavigation.org/docs/en/auth-flow.html)
export default createAppContainer(
  createSwitchNavigator(
    {
      [ROUTES.AUTH_LOADING]: AuthLoading,
      [ROUTES.AUTH]: AuthStack,
      [ROUTES.MAIN]: MainStack,
    },
    {
      initialRouteName: ROUTES.AUTH_LOADING,
      mode: 'modal',
      headerMode: 'none',
    }
  )
);
