import React from 'react';
import {
  Router as RouterApp,
  Scene,
  Stack,
} from 'react-native-router-flux';
import { ThemeProvider } from 'emotion-theming';

import theme from './theme';
import { LoginEmail, LoginPassword, ListRepository, ListCommits } from './feature';
import { Header } from './components';

const Router = () => (
  <ThemeProvider theme={theme}>
    <RouterApp>
      <Stack key="root">
        <Scene key="login" hideNavBar={true} initial>
          <Scene
            key="loginEmail"
            component={LoginEmail}
            title="Login"
            initial
          />
          <Scene
            key="loginPassword"
            component={LoginPassword}
            title="Login"
          />
        </Scene>
        <Scene key="repository" navBar={Header} >
          <Scene
            key="listRepositories"
            component={ListRepository}
            title="Repositórios"
            initial
            hideNavBar
            />
          <Scene
            key="listCommits"
            component={ListCommits}
            title="Commits"
            hideNavBar
          />
        </Scene>
      </Stack>
    </RouterApp>
  </ThemeProvider>
);

export default Router;
