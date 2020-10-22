import React from 'react';
import { Box, Text, Image } from '../../../components';

import Avatar from '../../../../assets/avatar.png';

const CommitItem = ({ commit = {} }) => {

	const {
		commit: commitMetadata = {},
		committer = {}
	} = commit;

	const { message } = commitMetadata;

	const imageAvatar = committer && committer.avatar_url ? { uri: committer.avatar_url } : Avatar;

	return (
		<Box
			flexDirection="row"
			alignItems="center"
			borderBottomWidth={0.5}
			borderColor="border"
			p="1"
			pb="3">
			<Image source={imageAvatar} size={50} borderRadius={25} />
			<Box
				flex={1}
				borderWidth={1}
				borderColor="border"
				justifyContent="center"
				borderRadius="2"
				ml="2">
				<Text
					fontWeight="semibold"
					px="2"
					py="4"
				>
					{message}
				</Text>
			</Box>
		</Box>
	)
};

export default CommitItem;