import React from 'react';
import { Box, Text } from '../../../components';

const HeaderRepository = ({name}) => {
	return (
		<Box
			borderRadius={1}
			borderWidth={1}
			borderColor="border"
			mb="1"
		>
			<Text

				textAlign="center"
				fontSize="sm"
				fontWeight="bold"
				mt="2"
				mb="2"
				>{name}</Text>
		</Box>

	);
};

export default HeaderRepository;