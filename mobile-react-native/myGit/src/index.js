import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './Config/ReactotronConfig';
import Navigation from './Routes/Navigation';
import { store, persistor } from './Store';
import { Colors } from './Styleguide';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StatusBar barStyle='default' />
      <Navigation />
    </PersistGate>
  </Provider>
);

export default App;
