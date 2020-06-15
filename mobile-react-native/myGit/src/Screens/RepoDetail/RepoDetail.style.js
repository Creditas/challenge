import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

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

export const DetailTitle = styled.Text`
  border-radius: ${Layout.Global.radius};
  padding: 16px;
  text-align: center;
  borderWidth: 1;
  borderColor: ${Colors.secondary};
  marginBottom: ${Margins.medium}px;
`;

export const DetailItem = styled(Animatable.View)`
  flex-direction: row;
  padding: ${Margins.small}px;
  border-color: ${Colors.secondary};
`;

export const DetailItemAvatar = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: ${Margins.small}
`;

export const DetailItemMessageWrapper = styled.View`
  borderWidth: 1;
  border-radius: ${Layout.Global.radius};
  border-color: ${Colors.secondary};
  padding: ${Margins.medium}px;
  flexGrow: 1;
  maxWidth: 84%;
`;
