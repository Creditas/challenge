import React from 'react';
import { Box, Text, Image } from '../../../components';

import Avatar from '../../../../assets/avatar.png';

const CommitItem = () => {

	return (
		<Box
			flexDirection="row"
			alignItems="center"
			borderBottomWidth={0.5}
			borderColor="border"
			p="1"
			pb="3">
			<Image source={Avatar} />
			<Box
				flex={1}
				borderWidth={1}
				borderColor="border"
				justifyContent="center"
				alignItems="center"
				borderRadius="2"
				ml="2">
				<Text
					fontWeight="semibold"
					px="2"
					py="4"
				>
					Commit Message
				</Text>
			</Box>
		</Box>
	)
};

export default CommitItem;