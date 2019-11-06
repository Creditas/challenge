import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './Config/ReactotronConfig';
import Navigation from './Routes/Navigation';
import { store, persistor } from './Store';
import { getDeviceLanguage } from './Utils/i18n-helper';

import I18n from './I18n/I18n';

I18n.locale = getDeviceLanguage();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StatusBar barStyle='default' />
      <Navigation />
    </PersistGate>
  </Provider>
);

export default App;
