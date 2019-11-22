import React from 'react';
import { mount } from 'enzyme';
import Box from '../Box';

describe('<Box />', () => {
  it('should render component with spaces by theme', () => {
    const wrapper = mount(<Box m="3" p="2" />);
    console.log(wrapper.children().get(0).props.style);

    const valueMargin = wrapper.children().get(0).props.style.margin;
    const accertMargin = 16;

    const valuePadding = wrapper.children().get(0).props.style.padding;
    const accertPadding = 8;

    expect(valueMargin).toBe(accertMargin);
    expect(valuePadding).toBe(accertPadding);
  });
});
