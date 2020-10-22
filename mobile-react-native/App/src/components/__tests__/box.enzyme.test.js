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

  it('should render with variant "main"', () => {
    const wrapper = mount(<Box variant="main" />);

    const valueBg = wrapper.children().get(0).props.style.backgroundColor;
    const accertBg = 'white';

    const valuePl = wrapper.children().get(0).props.style.paddingLeft;
    const valuePr = wrapper.children().get(0).props.style.paddingRight;
    const accertPx = 8;

    const valueFx = wrapper.children().get(0).props.style.flex;
    const accertFx = 1;

    expect(valueBg).toBe(accertBg);
    expect(valuePl).toBe(accertPx);
    expect(valuePr).toBe(accertPx);
    expect(valueFx).toBe(accertFx);
  });

  it('should render with more cases', () => {
    const wrapper = mount(
      <Box>
        <Box size="6" />
        <Box p="4" />
        <Box m="2" />
      </Box>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
