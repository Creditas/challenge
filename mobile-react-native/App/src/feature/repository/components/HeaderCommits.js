import React from 'react';
import { Box, Text } from '../../../components';

const HeaderRepository = () => {
	return (
		<Box
			borderRadius={1}
			borderWidth={1}
			borderColor="border"
			mb="4"
		>
			<Text

				textAlign="center"
				fontSize="sm"
				fontWeight="bold"
				mt="2"
				mb="2"
				>Repository Name</Text>
		</Box>

	);
};

export default HeaderRepository;