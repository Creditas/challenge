import React, { useContext } from 'react';

import { Box, Input, Button, Image } from '../../components';
import LogoRounded from '../../../assets/github-rounded.png';
import { SessionContext } from '../../context';

const LoginEmail = () => {
	const {
		useEmail,
		valideEmail,
	} = useContext(SessionContext);

	const [email, setEmail] = useEmail;

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
				onSubmitEditing={valideEmail}
			/>
			<Button
				label="Next"
				onPress={valideEmail}
			/>
		</Box>
	)
};

export default LoginEmail;