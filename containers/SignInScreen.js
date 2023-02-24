import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
// IMAGE
import logo from "../assets/logo.png";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessge] = useState("");
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      setErrormessge("");
      if (!email || !password) {
        return alert("merci de remplir tous les champs");
      }
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      if (!response) {
        alert("pas autorise");
      }

      if (response.data.token) {
        setToken(response.data.token, response.data._id);
        await AsyncStorage.setItem("id", response.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
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
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(input) => {
              setPassword(input);
            }}
          />
        </View>
        <View>
          <View>{errormessage}</View>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.button}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginBottom: 60 }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    height: 600,
    backgroundColor: "white",
  },
  image: {
    height: 100,
    width: 100,
  },
  button: {
    color: "gray",
    borderColor: "#FF385C",
    borderWidth: 2,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 20,
  },
});
