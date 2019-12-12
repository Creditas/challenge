import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import Button from '../../src/components/Button';
import {ButtonContainer} from '../../src/components/Button/styles';

describe('Button', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer.create(<Button title="Testing" onPress={() => {}} />).toJSON();
      expect(component).toMatchSnapshot();
    });
    it('should match to snapshot - Secondary Color', () => {
      const component = renderer.create(<Button title="Testing" onPress={() => {}} secondary />).toJSON();
      expect(component).toMatchSnapshot();
    });

    describe('Styles', () => {
      it('should match to snapshot', () => {
        const component = renderer.create(<ButtonContainer />).toJSON();
        expect(component).toMatchSnapshot();
      });
      it('should match to snapshot - with margin', () => {
        const component = renderer.create(<ButtonContainer margin />).toJSON();
        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('Interaction', () => {
    describe('onPressHandler', () => {
      it('should call onPress', () => {
        const onPressMock = jest.fn();
        const component = shallow(<Button title="Testing" onPress={onPressMock} />);

        component.props().onPress();

        expect(onPressMock).toHaveBeenCalled();
        expect(onPressMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
