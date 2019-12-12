import styled from 'styled-components/native';
import theme from '../../../../components/theme';

export const SearchBarContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.padding/2}px;
  background: ${theme.colors.grey};
`;

export const Icon = styled.View`
  background: transparent;
  position: absolute;
  top: 8px;
  left: 9px;
`;

export const IconImage = styled.Image`
  height: 24px;
  width: 24px;
`;

export const SearchTextInput = styled.TextInput`
  width: 100%;
  height: 28px;
  padding: 0 0 0 30px;
  background: ${theme.colors.light};
  border-radius: 4px;
`;
