import React, { createContext, useState } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Alert } from 'react-native';
import {encode} from 'base-64'

import { validateEmail } from './utils/validations';
import { fetchDataUser } from '../service/session';


export const SessionContext = createContext();
SessionContext.displayName = 'SessionContext';

const ProviderSession = ({ children }) => {
	const useEmail = useState("");
	const [email, setEmail] = useEmail;

	const usePassword = useState("")
	const [password, setPassword] = usePassword;

	const [userGithub, setUserGithub] = useState({});

	const [token, setToken] = useState();

	const valideEmail = () => {

		if (validateEmail(email)) {
			Actions.loginPassword();
		}
	};

	const validePassword = async () => {
		if (password) {
			try {
				const tokenGenerate = encode(`${email}:${password}`);
				const dataUser = await fetchDataUser(tokenGenerate);
				setUserGithub(dataUser);
				setToken(tokenGenerate);
				Actions.repository({ type: ActionConst.RESET });
			} catch (err) {
				Alert.alert("Ops...", "Verifique seu usuário e senha.")
			}
		}
	};

	const backToEmail = () => {
		setPassword("");
		Actions.pop();
	};

	return (
		<SessionContext.Provider
			value={
				{
					useEmail,
					usePassword,
					valideEmail,
					validePassword,
					backToEmail,
					user: userGithub,
					token
				}
			}
		>
			{children}
		</SessionContext.Provider>
	)
};

export default ProviderSession;