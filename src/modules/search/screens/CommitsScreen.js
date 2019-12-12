import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import * as commitActions from '../../../store/commit/actions';

import ScreenContainer from '../../../components/common/ScreenContainer';
import Header from '../../../components/common/Header';
import Label from '../../../components/common/Label';
import CommitList from '../components/CommitList';

const CommitsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const repoName = navigation.getParam('name', '');
  const id = navigation.getParam('id', '');

  const handleBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    dispatch(commitActions.listRequested(id));
    return () => {
      dispatch(commitActions.listFetched([]));
    };
  }, []);

  return (
    <ScreenContainer>
      <Header onBack={handleBack} />
      <Label secondary>{repoName}</Label>
      <CommitList />
    </ScreenContainer>
  );
};

export default CommitsScreen;
