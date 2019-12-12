import React from 'react';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';

import AppNavigator from './routes';
import store from './store';

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
