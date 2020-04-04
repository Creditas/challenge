require("react-native").unstable_enableLogBox();
import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from "react-native";

import api from "../services/api";

import logo from "../assets/logo.png";

export default function Login1({ navigation }) {
  const [username, setUsername] = useState("");

  function handleSubmit() {
    api
      .get(`/users/${username}`)
      .then(async (response) => {
        await AsyncStorage.setItem("username", username);
        navigation.navigate("Login2");
      })
      .catch((err) => {
        Alert.alert("User not exists");
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={logo} style={styles.image} />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Your Github username"
          placeholderTextColor="#999"
          autoCorrect={false}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.textbutton}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
  },
  input: {
    textAlign: "center",
    width: 250,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 5,
    fontSize: 16,
    color: "#000",
    marginTop: 100,
    borderRadius: 2,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 3,
    borderColor: "#999",
    borderWidth: 2,
  },
  textbutton: {
    fontSize: 15,
    color: "#999",
  },
});
