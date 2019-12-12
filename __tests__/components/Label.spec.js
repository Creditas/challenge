import React from 'react';
import renderer from 'react-test-renderer';

import Label from '../../src/components/common/Label';

describe('Label', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const tree = renderer.create(<Label>Testing</Label>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should match to snapshot - light color', () => {
      const tree = renderer.create(<Label light>Testing</Label>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
