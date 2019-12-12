import styled from 'styled-components/native';

import theme from '../theme';

export const HeaderContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: ${theme.spacing.padding / 2}px;
`;

export const HeaderLogo = styled.Image`
  height: 45px;
`;

export const BackIconContainer = styled.TouchableOpacity`
  position: absolute;
  left: 12px;
  top: 16px;
  z-index: 99;
`;

export const BackIconImage = styled.Image`
  height: 25px;
  width: 25px;
`;
