import React from 'react';
import { mount } from 'enzyme';
import { Input } from '..';
import { ThemeProvider } from 'emotion-theming';
import theme from '../../theme';

const SetupInput = props => <ThemeProvider theme={theme} {...props} />;

describe('<Input/>', () => {
  it('should render rigth', () => {
    const wrapper = mount(
      <SetupInput>
        <Input placeholder="Hi hummant, i'm a test" />
      </SetupInput>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
