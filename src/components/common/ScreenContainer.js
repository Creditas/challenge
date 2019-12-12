import {SafeAreaView} from 'react-native';
import styled from 'styled-components';
import theme from '../theme';

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  padding: ${p => p.padding ? theme.spacing.padding : 0}px;
  background: #ffffff;
`;

export default ScreenContainer;
