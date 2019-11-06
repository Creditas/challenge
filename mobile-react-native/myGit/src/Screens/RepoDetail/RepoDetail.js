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
} from './RepoDetail.style';
import { Margins, Colors, Layout } from '../../Styleguide';

const RepoDetail = ({ navigation }) => {
  const dispatch = useDispatch();
  const repo = navigation.getParam('repo');
  const commitState = useSelector(state => state.repository.commits);
  const commits = commitState[repo.id]; // Cached Commits
  const isLoadingCommits = useSelector(state => state.repository.loadingCommits);

  useEffect(() => {
    if (!commits) {
      console.log(`Fetching new commits for ${repo.name}`);
      dispatch(getCommits(repo));
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
      <Text style={{ borderRadius: Layout.Global.radius, padding: 16, textAlign: 'center', borderWidth: 1, borderColor: Colors.secondary, marginBottom: Margins.medium }}>
        {repo.name} ({commits.length} commits)
      </Text>
      <ScrollView>
        {commits.map((commit, index) => (
          <Animatable.View
            key={commit.sha}
            animation="fadeInUpBig"
            duration={200}
            delay={index * 200}
            useNativeDriver
            style={{
              flexDirection: 'row',
              padding: Margins.small,
              borderTopWidth: index ? 1 : 0,
              borderColor: Colors.secondary,
            }}
          >
            <Image
              style={{ width: 50, height: 50, marginRight: Margins.small }}
              source={getCommitAvatar(commit)}
            />
            <View style={{ borderWidth: 1, borderRadius: Layout.Global.radius, borderColor: Colors.secondary, padding: Margins.medium, flexGrow: 1, maxWidth: '84%' }}>
              <Text>{commit.commit.message}</Text>
            </View>
          </Animatable.View>
        ))}
      </ScrollView>
    </Wrapper>
  )
}

export default RepoDetail;
