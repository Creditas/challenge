import React from 'react';
import { FlatList } from 'react-native';

import { Box } from '../../components';
import RepositoryItem from './components/RepositoryItem';
import HeaderRepository from './components/HeaderRepository';

const ListRepository = () => {
	return(
		<Box variant="main" pt="4">
			<FlatList
				data={[0,1,2,3,4,5]}
				ListHeaderComponent={
					<HeaderRepository />
				}
				renderItem={()=><RepositoryItem />}
			/>
		</Box>
	);
};

export default ListRepository;