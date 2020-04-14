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
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import api from "../services/api";

import banner from "../assets/banner.png";

export default function Repositories({ navigation }) {
  const [repositories, setRepositories] = useState([]);
  const [search, setSearch] = useState("");

  async function loadRepositories() {
    try {
      const username = await AsyncStorage.getItem("username");
      const response = await api.get(`/users/${username}/repos`);
      setRepositories(response.data);
    } catch (err) {
      console.log("Not repositories");
    }
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function searchRepository() {
    if (!search) Alert.alert("Fill in the field!");
    else {
      try {
        const username = await AsyncStorage.getItem("username");
        const response = await api.get(`/repos/${username}/${search}`);
        setRepositories([response.data]);
      } catch (err) {
        Alert.alert("You don't have any repositories");
      }
    }
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
        onEndReachedThreshold={0.2}
        renderItem={({ item: repository }) => (
          <>
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
            <View style={styles.lineStyle} />
          </>
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
    marginTop: 5,
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
  lineStyle: {
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: "black",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    width: "100%",
  },
  buttonText: {},
});
