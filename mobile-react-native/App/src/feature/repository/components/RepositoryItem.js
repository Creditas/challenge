import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '../../../components';
import { Actions } from 'react-native-router-flux';

const RepositoryItem = () => {

	return (
		<TouchableOpacity onPress={() => Actions.listCommits()}>
			<Box
				borderBottomWidth={0.5}
				borderColor="border"
				p="1"
				pb="3">
				<Text
					fontWeight="bold"
					fontSize="lg"
					mb="1"
				>
					Repository Name
			</Text>
				<Box
					borderWidth={1}
					borderColor="border"
					justifyContent="center"
					alignItems="center"
					borderRadius="2">
					<Text
						fontWeight="semibold"
						px="2"
						py="4"
					>
						Repository Description
				</Text>
				</Box>
			</Box>
		</TouchableOpacity>
	)
};

export default RepositoryItem;