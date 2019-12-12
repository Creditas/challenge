import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../src/components/common/Header';

describe('Header', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const tree = renderer.create(<Header />).toJSON();
      expect(tree).toMatchSnapshot();
    });
    it('should match to snapshot', () => {
      const tree = renderer.create(<Header onBack={() => {}} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
