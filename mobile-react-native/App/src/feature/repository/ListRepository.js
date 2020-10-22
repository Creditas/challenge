import React, { useContext, useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';

import { Box } from '../../components';
import RepositoryItem from './components/RepositoryItem';
import HeaderRepository from './components/HeaderRepository';
import ProviderRepository, { RepositoryContext } from '../../context/repository';

const ListRepository = () => {
	const [filter, setFilter] = useState("");

	const {
		repos,
		isLoadingRepos,
		getAllRepository
	} = useContext(RepositoryContext);

	useEffect(() => {
		getAllRepository();
	}, []);

	const getReposSearch = () => repos.filter(repo => repo.name.toUpperCase().includes(filter.toUpperCase()));

	return (
		<Box variant="main" pt="4">
			{
				isLoadingRepos && <ActivityIndicator size="large" color="#515151" />
			}
			<HeaderRepository changeTextSearch={term => setFilter(term)} />
			<FlatList
				keyExtractor={item => `${item.id}`}
				data={getReposSearch()}
				renderItem={({ item }) => <RepositoryItem repo={item} />}
			/>
		</Box>
	);
};

export default ListRepository;