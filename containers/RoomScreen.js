import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
// import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import * as Location from "expo-location";
// ?latitude=${}?longitude=${}
export default function RoomScreen() {
  const [latitude, setLatidude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isloading, setIsloading] = useState(true);

  const fetchData = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setLatidude(location.coords.latitude);
        setLongitude(location.coords.longitude);

        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
        );
        console.log(response.data);
        setIsloading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return isloading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <MapView
        style={{ height: "100%", width: "100%" }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker />
      </MapView>
    </View>
  );
}
