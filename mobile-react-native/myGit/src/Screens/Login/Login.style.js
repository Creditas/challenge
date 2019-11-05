import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import PrimaryButton from '../../Components/PrimaryButton';
import { Colors, Layout, Margins, Buttons } from '../../Styleguide';

const { width, height } = Dimensions.get('window');

export const Wrapper = styled.View`
  ${Layout.Global.wrapper};
  padding-left: ${Margins.base}px;
  padding-right: ${Margins.base}px;
  justify-content: center;
`;

export const LoginLogo = styled.Image`
  width: ${width / 2}px;
  height: ${width / 2}px;
  marginBottom: ${Margins.base}px;
  align-self: center;
  resizeMode: contain;
`;

export const LoginFormWrapper = styled.KeyboardAvoidingView`
  width: 100%;
  padding-bottom: ${Margins.medium}px;
`;

export const LoginText = styled.Text`
  font-size: 16px;
  alignSelf: center;
  margin-top: ${Margins.base}px;
  margin-bottom: ${Margins.base}px;
  color: ${Colors.primary};
`;

export const LoginError = styled.Text`
  position: absolute;
  top: 10%;
  font-size: 24px;
  alignSelf: center;
  color: ${Colors.white};
  padding: ${Margins.small}px;
  width: 90%;
  text-align: center;
  background-color: ${Colors.red};
`;

export const LoginInput = styled.TextInput`
  width: 100%;
  height: 40px;
  margin-top: ${Margins.base}px;
  margin-bottom: ${Margins.base}px;
  borderColor: ${Colors.secondary};
  borderWidth: 1;
  backgroundColor: ${Colors.white};
  text-align: center;
`;

export const LoginButton = styled(PrimaryButton)`
  margin: ${Margins.medium}px;
`
