import styled from 'styled-components/native';

import theme from '../theme';

export const InputHolder = styled.View`
  position: relative;
  border-bottom-width: 1px;
  border-bottom-color: ${p => (p.error ? theme.colors.error : theme.colors.dark)};
`;

export const FormGroup = styled.View`
  width: 100%;
  margin-bottom: 4px;
  position: relative;
`;
