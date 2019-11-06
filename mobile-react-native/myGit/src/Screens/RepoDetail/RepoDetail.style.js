import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

import PrimaryButton from '../../Components/PrimaryButton';
import { Colors, Layout, Margins, Buttons } from '../../Styleguide';

const { width } = Dimensions.get('window');

export const Wrapper = styled.View`
  ${Layout.Global.wrapper};
  padding-left: ${Margins.small}px;
  padding-right: ${Margins.small}px;
  justify-content: center;
`;

export const Logo = styled(Animated.Image)`
  height: 60px;
  align-self: center;
  resizeMode: contain;
`;

