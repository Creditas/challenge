import React, { useState } from 'react';

import { Box, Input, Button, Image } from '../../components';

import LogoRounded from '../../../assets/github-rounded.png';
import { Actions } from 'react-native-router-flux';

const LoginEmail = () => {
	const [email, setEmail] = useState('');

	const pressNext = () => {
		Actions.loginPassword({ email });
	};

	return (
		<Box
			justifyContent="center"
			alignItems="center"
			variant="main"
			py="6"
		>
			<Image
				source={LogoRounded}
				size={180}
				mb="5" />
			<Input
				placeholder="Your Github email address"
				value={email}
				onChangeText={email => setEmail(email)}
				width="80%"
				mb="4"
				autoCompleteType="email"
				keyboardType="email-address"
			/>
			<Button
				label="Next"
				onPress={pressNext}
			/>
		</Box>
	)
};

export default LoginEmail;