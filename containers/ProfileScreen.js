// import { useRoute } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";

export default function ProfileScreen() {
  const [data, setData] = useState({});
  const [isloading, setIsloading] = useState(false);

  // const { params } = useRoute();
  // console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      const id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("user-Token");
      const headers = {
        Authorization: `Bearer Token ${token}`,
        "Content-type": "multipart/form-data",
      };

      const response = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`,
        { headers }
      );
      console.log(response.data);
      setIsloading(true);
    };
    fetchData();
  }, []);

  return !isloading ? (
    <ActivityIndicator></ActivityIndicator>
  ) : (
    <View>
      <Text>user id : </Text>
    </View>
  );
}
