/**
 * @format
 */

import 'react-native';
import React from 'react';
import { RepoList } from '../RepoList';
import renderer from 'react-test-renderer';

it('renders RepoList correctly (snapshot)', () => {
  const component = renderer.create(<RepoList />).toJSON();
  expect(component).toMatchSnapshot();
});
