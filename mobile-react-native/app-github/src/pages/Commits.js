import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  AsyncStorage,
} from "react-native";
import Constants from "expo-constants";

import api from "../services/api";

import banner from "../assets/banner.png";

export default function Commits({ navigation }) {
  const [commits, setCommits] = useState([]);
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");

  async function loadData() {
    await AsyncStorage.getItem("username").then((value) => {
      setUsername(value);
    });

    await AsyncStorage.getItem("repo").then((value) => {
      setRepo(value);
    });
  }

  async function loadCommits() {
    loadData();
    while (!(username && repo)) {
      loadData();
    }

    api.get(`/repos/${username}/${repo}/commits`).then((response) => {
      setCommits(response.data);
    });
  }

  useEffect(() => {
    loadCommits();
  }, []);

  function backRepositories() {
    navigation.navigate("Repositories");
  }

  return (
    <View style={styles.container}>
      <Image source={banner} style={styles.banner} />
      <TouchableOpacity style={styles.repository} onPress={backRepositories}>
        <Text style={styles.repositoryText}>{repo}</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.commitList}
        data={commits}
        keyExtractor={(commit) => String(commit.sha)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadCommits}
        onEndReachedThreshold={0.2}
        renderItem={({ item: commit }) => (
          <View style={styles.commit}>
            <Image
              style={styles.avatar}
              source={{ uri: commit.author.avatar_url }}
            />
            <View style={styles.message}>
              <Text style={styles.textMessage}>{commit.commit.message}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight + 10,
    alignItems: "center",
  },
  banner: {
    width: 170,
    height: 70,
  },
  repository: {
    marginTop: 20,
  },
  repositoryText: {
    fontSize: 20,
  },
  commit: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 20,
  },
  commitList: {
    marginTop: 32,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 3,
  },
  message: {
    height: 70,
    width: 270,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 3,
  },
  textMessage: {},
});
