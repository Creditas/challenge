import React from 'react';
import renderer from 'react-test-renderer';

import ScreenContainer from '../../src/components/common/ScreenContainer';

describe('ScreenContainer', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const tree = renderer.create(<ScreenContainer />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match to snapshot - with padding', () => {
      const tree = renderer.create(<ScreenContainer padding />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
