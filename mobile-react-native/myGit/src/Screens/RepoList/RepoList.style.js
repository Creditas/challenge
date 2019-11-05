import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Layout, Margins } from '../../Styleguide';

const { width, height } = Dimensions.get('window');

export const Wrapper = styled.View`
  ${Layout.Global.wrapper};
  padding: 8px;
`;

export const Logo = styled.Image`
  width: ${width / 2}px;
  height: ${width / 5}px;
  marginBottom: ${Margins.small}px;
  align-self: center;
  resizeMode: contain;
`;

