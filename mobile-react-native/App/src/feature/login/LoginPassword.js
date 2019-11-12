import React, { useState } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';

import { Box, Input, Button, Image, Text } from '../../components';
import LogoRounded from '../../../assets/github-rounded.png';

const LoginPassword = ({ email }) => {
	const [password, setPassword] = useState("");

	const pressNext = () => {
		Actions.repository({type: ActionConst.RESET});
	};

	const backPress = () => {
		Actions.pop();
	};

	return (
		<Box
			justifyContent="center"
			alignItems="center"
			variant="main"
			py="6"
		>
			<Image
				mb="5"
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
			/>
			<Button
				mb="4"
				label="Login"
				onPress={pressNext}
			/>
			<Button
				label="Back"
				onPress={backPress}
			/>
		</Box>
	)
};

export default LoginPassword;