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
import { SessionProvider } from './context';
import ProviderRepository from './context/repository';

const Router = () => (
  <ThemeProvider theme={theme}>
    <SessionProvider>
      <ProviderRepository>
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
      </ProviderRepository>
    </SessionProvider>
  </ThemeProvider>
);

export default Router;
