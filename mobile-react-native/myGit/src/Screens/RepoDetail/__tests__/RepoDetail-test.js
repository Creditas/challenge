/**
 * @format
 */

import 'react-native';
import React from 'react';
import RepoDetail from '../RepoDetail';
import renderer from 'react-test-renderer';

const navigation = {
  getParam: () => ({ id: 1 }),
};

it('renders RepoList correctly (snapshot)', () => {
  const component = renderer.create(<RepoDetail navigation={navigation} />).toJSON();
  expect(component).toMatchSnapshot();
});
