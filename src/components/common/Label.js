import styled from 'styled-components/native';

import theme from '../theme';

const Label = styled.Text`
  text-align: left;
  color: ${p => theme.getColorFromProps(p)};
  margin: ${theme.spacing.margin / 2}px;
`;

export default Label;
