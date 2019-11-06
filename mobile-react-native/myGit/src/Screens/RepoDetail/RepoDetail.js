import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { getCommits, getCommitAvatar } from '../../Store/Ducks/repository';

import {
  Wrapper,
  Logo,
  DetailTitle,
  DetailItem,
  DetailItemAvatar,
  DetailItemMessageWrapper,
} from './RepoDetail.style';
import { Margins, Colors, Layout } from '../../Styleguide';

const RepoDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  const repo = navigation.getParam('repo');
  const commitState = useSelector(state => state.repository.commits);
  const commits = commitState[repo.id]; // Cached Commits
  const isLoadingCommits = useSelector(state => state.repository.loadingCommits) || false;

  useEffect(() => {
    if (!commits) {
      if (dispatch) {
        dispatch(getCommits(repo));
      }
    }
  }, [commits])

  if (isLoadingCommits || !commits) {
    return (
      <ActivityIndicator style={{ flex: 1 }} />
    );
  }

  return (
    <Wrapper>
      <Logo source={require('../../Assets/github-logo-full.png')} />
      <DetailTitle>
        {repo.name} ({commits.length} commits)
      </DetailTitle>
      <ScrollView>
        {commits.map((commit, index) => (
          <DetailItem
            key={commit.sha}
            animation="fadeInUpBig"
            duration={200}
            delay={index * 200}
            useNativeDriver
            style={{ borderTopWidth: index ? 1 : 0 }}
          >
            <DetailItemAvatar source={getCommitAvatar(commit)} />
            <DetailItemMessageWrapper>
              <Text>{commit.commit.message}</Text>
            </DetailItemMessageWrapper>
          </DetailItem>
        ))}
      </ScrollView>
    </Wrapper>
  )
}

export default RepoDetail;
