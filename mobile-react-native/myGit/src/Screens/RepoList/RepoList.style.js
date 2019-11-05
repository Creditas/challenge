import { Dimensions, Animated } from 'react-native';
import styled from 'styled-components/native';

import { Layout, Margins } from '../../Styleguide';

const { width, height } = Dimensions.get('window');

export const Wrapper = styled.View`
  ${Layout.Global.wrapper};
  padding: 8px;
`;

export const Logo = styled(Animated.Image)`
  height: 60px;
  align-self: center;
  resizeMode: contain;
`;

