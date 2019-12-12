import styled from 'styled-components/native';
import theme from '../../../components/theme';
import {View} from 'react-native-animatable';

export const LogoContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.Image`
  width: 160px;
  height: 160px;
`;

export const FormContainer = styled(View)`
  flex: 1;
  justify-content: center;
  padding: ${theme.spacing.padding}px;
`;

export const RelativeContainer = styled.View`
  position: relative;
  flex: 1;
`;
