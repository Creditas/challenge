import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionContext } from './session';
import { fetchRepositories, fetchCommits } from '../service/repository';

export const RepositoryContext = createContext();
RepositoryContext.displayName = 'RepositoryContext';

const ProviderRepository = ({ children }) => {
	const {
		user, 
		token
	} = useContext(SessionContext);

	const [ repos, setRepos ] = useState([]);
	const [ commits, setCommits ] = useState([]);

	const [ isLoadingRepos, setLoadingRepos ] = useState(false);
	const [ isLoadingCommits, setLoadingCommits ] = useState(false);

	const getAllRepository = async () => {
		setLoadingRepos(true);
		try{
			const allRepos = await fetchRepositories(user.login, token);
			setRepos(allRepos);
			setLoadingRepos(false);
		}catch(err){
			setLoadingRepos(false);
			alert.alert("Ops...", "Tivemos um erro ao buscar os repositórios, tente novamente.");
		}
	};

	const getAllCommitsByRepo = async (nameRepo) => {
		setLoadingCommits(true);
		setCommits([])
		try{
			const allCommits = await fetchCommits(user.login, nameRepo, token);
			setCommits(allCommits);
			setLoadingCommits(false);
		}catch(err){
			setLoadingCommits(false);
			alert.alert("Ops...", "Tivemos um erro ao buscar os commits, tente novamente.");
		}
	};

	return (
		<RepositoryContext.Provider value={{
			repos, 
			commits,
			isLoadingRepos,
			getAllRepository,
			isLoadingCommits,
			getAllCommitsByRepo,
		}}>
			{children}
		</RepositoryContext.Provider>
	)
};

export default ProviderRepository;