import React from 'react';
import { Input } from '../../../components';

const HeaderRepository = ({changeTextSearch}) => {
	return (
		<Input placeholder="Repository Search" mb="1" onChangeText={changeTextSearch} />
	);
};

export default HeaderRepository;