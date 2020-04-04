import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import api from "../services/api";

import banner from "../assets/banner.png";

export default function Repositories({ navigation }) {
  const [repositories, setRepositories] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");

  AsyncStorage.getItem("username").then((value) => {
    setUsername(value);
  });

  function loadRepositories2(value) {
    api
      .get(`/users/${value}/repos`)
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((err) => {
        AsyncStorage.getItem("username").then((value) => {
          loadRepositories();
        });
      });
  }

  async function loadRepositories() {
    if (search) setSearch("");

    if (search === "") {
      api
        .get(`/users/${username}/repos`)
        .then((response) => {
          setRepositories(response.data);
        })
        .catch((err) => {
          AsyncStorage.getItem("username").then((value) => {
            loadRepositories2(value);
          });
        });
    }
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  function searchRepository() {
    api.get(`/repos/${username}/${search}`).then((response) => {
      setRepositories([response.data]);
    });
  }

  function deleteInput() {
    setSearch("");
    loadRepositories();
  }

  async function navigateToCommits(repo) {
    await AsyncStorage.setItem("repo", repo.name);

    navigation.navigate("Commits");
  }

  return (
    <View style={styles.container}>
      <Image source={banner} style={styles.banner} />
      <View style={styles.search}>
        <TouchableOpacity onPress={searchRepository}>
          <Feather name="search" size={30} color="#999" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Repository Search"
          placeholderTextColor="#999"
          autoCorrect={false}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity onPress={deleteInput}>
          <Ionicons name="md-close-circle-outline" size={30} color="#999" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.repositoryList}
        data={repositories}
        keyExtractor={(repository) => String(repository.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadRepositories}
        onEndReachedThreshold={0.2}
        renderItem={({ item: repository }) => (
          <View style={styles.repository}>
            <Text style={styles.repoName}>{repository.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigateToCommits(repository)}
            >
              <Text style={styles.buttonText}>
                {repository.description ? repository.description : ""}
              </Text>
            </TouchableOpacity>
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
  search: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 3,
    marginTop: 30,
  },
  input: {
    textAlign: "center",
    width: 290,
    paddingVertical: 5,
    fontSize: 16,
  },
  repository: {
    marginTop: 20,
    marginBottom: 20,
  },
  repoName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  repositoryList: {
    marginTop: 32,
  },
  button: {
    borderRadius: 3,
    borderColor: "#999",
    borderWidth: 1,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  buttonText: {},
});
