import React from 'react';
import {FlatList} from 'react-native';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';

import * as repoSelectors from '../../../store/repository/selectors';
import {ItemSeparator} from './styles';
import RepositoryItem from './RepositoryItem';
import Label from '../../../components/common/Label';

const RepositoryList = ({navigation}) => {
  const repositories = useSelector(repoSelectors.getFilteredList);
  const loading = useSelector(repoSelectors.getLoading);

  const handleOpen = ({name, id}) => {
    navigation.navigate('Commits', {name, id});
  };

  return (
    <FlatList
      data={repositories}
      refreshing={loading}
      onRefresh={() => {}}
      ItemSeparatorComponent={() => <ItemSeparator />}
      keyExtractor={item => item.name}
      renderItem={({item}) => (
        <RepositoryItem repo={item} onPress={() => handleOpen(item)} />
      )}
      ListEmptyComponent={() => (!loading && <Label error>No Repository Found</Label>)}
    />
  );
};

export default withNavigation(RepositoryList);
