import styled from '@emotion/native';
import { color, flexbox, layout, space, position, border, variant } from 'styled-system';

const Box = styled.View(
	layout,
	color,
	space,
	flexbox,
	position,
	border,
	variant({
		variants: {
			main: {
				backgroundColor: 'white',
				px: 2,
				flex: 1
			}
		}
	})
);

export default Box;

