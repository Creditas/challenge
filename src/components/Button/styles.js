import styled from 'styled-components/native';

import theme from '../theme';

export const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  padding: ${theme.spacing.padding}px;
  border-radius: 0;
  background: ${p => theme.getColorFromProps(p)};
  justify-content: center;
  align-items: center;
  margin: ${p => (p.margin ? theme.spacing.margin / 2 : 0)}px 0;
`;

export const ButtonText = styled.Text`
  color: ${theme.colors.light};
  text-transform: uppercase;
`;
