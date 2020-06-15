/**
 * @format
 */

import 'react-native';
import React from 'react';
import Login from '../Login';
import renderer from 'react-test-renderer';

it('renders Login correctly (snapshot)', () => {
  const component = renderer.create(<Login />).toJSON();
  expect(component).toMatchSnapshot();
});

