import React from 'react';
import renderer from 'react-test-renderer'

import Loading from '../../src/components/Loading';

describe('Loading', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer.create(<Loading show={true} />).toJSON();
      expect(component).toMatchSnapshot();
    });

    it('should match to snapshot - hidden', () => {
      const component = renderer.create(<Loading show={false} />).toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
