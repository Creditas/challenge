import React from 'react';
import { Box, Image } from '.';

import LogoLabel from '../../assets/github-label.png';

const Header = () => (
	<Box
		alignItems="center"
		justifyContent="center"
		backgroundColor="white"
		height={45}
		>
		<Image source={LogoLabel} height={40} resizeMode="center" />
	</Box>
);

export default Header;