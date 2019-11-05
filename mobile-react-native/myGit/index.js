/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import App from './src';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
  'Warning: Overriding previous layout animation with new one before the first began', // Multiple LayoutAnimation runs warning
  'react-devtools agent got no connection', // devtools lost connection warning
]);

AppRegistry.registerComponent(appName, () => App);
