import styled from 'styled-components/native';
import {View} from 'react-native-animatable';

import theme from '../theme';

export const LoadingContainer = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.light};
`;
