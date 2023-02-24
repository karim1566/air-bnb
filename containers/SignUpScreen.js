import { Button, Text, TextInput, View, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMAGE
import logo from "../assets/logo.png";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errormessage, setErrormessge] = useState("");

  const handleSubmit = async () => {
    try {
      setErrormessge("");
      if (password !== cpassword) {
        return alert("vos mot de passe ne sont pas identique");
      }
      if (!password || !email || !username || !description) {
        return setErrormessge("merci de remplir tout les champs");
      }
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );
      console.log(response);

      if (response.data) {
        setToken(response.data.token);
        alert("insciption reussie");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.form}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 80,
        }}
      >
        <Image style={styles.image} source={logo}></Image>
        <Text>Sing in</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(input) => {
            setEmail(input);
          }}
        />
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Username"
          onChangeText={(input) => {
            setusername(input);
          }}
        />
        <TextInput
          style={{
            margin: 20,
            width: 300,
            height: 100,
            paddingBottom: 10,
            borderColor: "#FF385C",
            borderWidth: 1,
          }}
          value={description}
          placeholder="Drecribe yourself in a few words..."
          onChangeText={(input) => {
            setDescription(input);
          }}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(input) => {
            setPassword(input);
          }}
        />
        <TextInput
          style={styles.input}
          value={cpassword}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(input) => {
            setCpassword(input);
          }}
        />
      </View>
      <Text style={{ color: "red" }}>{errormessage}</Text>
      <Button title="Sign up" onPress={handleSubmit} />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    margin: 20,
    width: 300,
    paddingBottom: 10,
    borderBottomColor: "#FF385C",
    borderBottomWidth: 1,
  },
  form: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: 100,
    width: 100,
  },
  button: {
    color: "lightgray",
    borderBottomColor: "#FF385C",
    borderWidth: 2,
  },
});
