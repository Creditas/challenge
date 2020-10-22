import React, { useEffect, useContext } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';

import { Box } from '../../components';
import CommitItem from './components/CommitItem';
import HeaderRepository from './components/HeaderCommits';
import { RepositoryContext } from '../../context/repository';

const ListCommits = ({ nameRepo }) => {
	const {
		commits,
		isLoadingCommits,
		getAllCommitsByRepo
	} = useContext(RepositoryContext);

	useEffect(() => {
		getAllCommitsByRepo(nameRepo);
	}, []);

	return (
		<Box variant="main" pt="4">
			{
				isLoadingCommits && <ActivityIndicator size="large" color="#515151" />
			}
			<HeaderRepository name={nameRepo} />
			<FlatList
				keyExtractor={item => `${item.id}`}
				data={commits}
				renderItem={({ item }) => <CommitItem commit={item} />}
			/>
		</Box>
	);
};

export default ListCommits;