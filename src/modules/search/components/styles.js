import styled from 'styled-components/native';
import theme from '../../../components/theme';

export const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background: ${theme.colors.grey};
`;

export const RepositoryItemContainer = styled.TouchableOpacity`
  padding: ${theme.spacing.padding / 2}px;
`;

export const RepositoryName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
`;

export const CommitItemContainer = styled.View`
  flex-flow: row;
  padding: ${theme.spacing.padding / 2}px;
`;

export const CommitMessage = styled.Text`
  flex: 1;
  padding: ${theme.spacing.padding / 2}px;
`;

export const UserAvatar = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 46px;
  width: 46px;
`;
