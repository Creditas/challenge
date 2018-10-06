import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from './index';

describe('[NotFound]', () => {
  it('Renders as the last snapshot', () => {
    const wrapper = renderer.create(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
