import React, { useContext } from 'react';

import { Box, Input, Button, Image, Text } from '../../components';
import LogoRounded from '../../../assets/github-rounded.png';
import { SessionContext } from '../../context';

const LoginPassword = () => {
	const {
		useEmail: [email],
		usePassword,
		validePassword,
		backToEmail,
	} = useContext(SessionContext);

	const [password, setPassword] = usePassword;

	return (
		<Box
			justifyContent="center"
			alignItems="center"
			variant="main"
			py="6"
		>
			<Image
				meb="5"
				source={LogoRounded}
				size={180}
			/>
			<Text
				textAlign="center"
				mb="4"
				fontWeight="semibold"
			>{email}</Text>
			<Input
				placeholder="Password"
				value={password}
				onChangeText={password => setPassword(password)}
				width="80%"
				mb="4"
				keyboardType="password"
				secureTextEntry
				onSubmitEditing={validePassword}
			/>
			<Button
				mb="4"
				label="Login"
				onPress={validePassword}
			/>
			<Button
				label="Back"
				onPress={backToEmail}
			/>
		</Box>
	)
};

export default LoginPassword;