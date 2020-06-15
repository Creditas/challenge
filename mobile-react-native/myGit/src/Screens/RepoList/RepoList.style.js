import { Dimensions, Animated } from 'react-native';
import styled from 'styled-components/native';

import { Layout, Margins, Colors } from '../../Styleguide';

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

export const ItemWrapper = styled.View`
  width: 100%;
  borderBottomWidth: 1;
  border-color: ${Colors.secondary};
  margin-bottom: ${Margins.small}
`;

export const ItemText = styled.Text`
  font-size: 21px;
  color: ${Colors.primary};
`;

export const ItemDescription = styled.View`
  borderRadius: ${Layout.Global.radius};
  borderWidth: 1;
  border-color: ${Colors.secondary};
  align-items: center;
  padding: 24px;
  margin-bottom: 24px;
`
