import styled from '@emotion/native';
import {
  color,
  flexbox,
  layout,
  space,
  position,
  typography,
} from 'styled-system';

const Image = styled.Text(layout, color, space, flexbox, position, typography);

Image.defaultProps = {
  color: 'primary',
  fontSize: 'md',
};

export default Image;
