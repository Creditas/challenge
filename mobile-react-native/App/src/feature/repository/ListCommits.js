import React from 'react';
import { FlatList } from 'react-native';

import { Box } from '../../components';
import CommitItem from './components/CommitItem';
import HeaderRepository from './components/HeaderCommits';

const ListCommits = () => {
	return (
		<Box variant="main" pt="4">
			<FlatList
				ListHeaderComponent={
					<HeaderRepository />
				}
				data={[0, 1, 2, 3, 4, 5]}
				renderItem={() => <CommitItem />}
			/>
		</Box>
	);
};

export default ListCommits;