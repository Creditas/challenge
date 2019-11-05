/**
 * @format
 */

import 'react-native';
import React from 'react';
import { AuthLoading } from '../AuthLoading';
import renderer from 'react-test-renderer';

it('renders AuthLoading correctly', () => {
  const component = renderer.create(<AuthLoading />).toJSON();
  expect(component).toMatchSnapshot();
});
