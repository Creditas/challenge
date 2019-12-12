import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import * as commitSelectors from '../../../store/commit/selectors';

import {ItemSeparator} from './styles';
import Label from '../../../components/common/Label';
import CommitItem from './CommitItem';

const CommitList = () => {
  const commits = useSelector(commitSelectors.getList);
  const loading = useSelector(commitSelectors.getLoading);

  return (
    <FlatList
      data={commits}
      refreshing={loading}
      onRefresh={() => {}}
      ItemSeparatorComponent={() => <ItemSeparator />}
      keyExtractor={item => item.sha}
      renderItem={({item}) => <CommitItem commit={item} />}
      ListEmptyComponent={() => (!loading && <Label error>No Commit Found</Label>)}
    />
  );
};

export default CommitList;
