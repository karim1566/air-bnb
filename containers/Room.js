import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";

export default function Room() {
  const route = useRoute();
  const [data, setData] = useState({});
  const [isloading, setIsloading] = useState(false);

  const star = <FontAwesome name="star" size={24} color="gold" />;

  const id = route.params.id;

  // const location= async()=>{
  //   const response=await axios.get("https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around/")
  // }

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setData(response.data);
        setIsloading(true);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const price = data.price;
  return !isloading ? (
    <ActivityIndicator />
  ) : (
    <View>
      <View style={styles.block}>
        <SwiperFlatList
          // autoplay
          // autoplayDelay={2}
          // autoplayLoop
          // index={2}
          // showPagination
          data={data.photos}
          renderItem={({ item }) => {
            return (
              <View style={{ height: 250 }}>
                <ImageBackground
                  style={styles.image}
                  source={{ uri: item.url }}
                />
                <View>
                  <Text style={styles.text}>{price} €</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 15,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontSize: 20 }}>{data.title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{star}</Text>
            <Text style={{ color: "gray" }}>{data.reviews} reviews</Text>
          </View>
        </View>

        <Image
          style={{ height: 100, width: 100, borderRadius: 50 }}
          source={{ uri: data.user.account.photo.url }}
        />
      </View>
      <Text
        style={{
          height: 60,
          width: 370,
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        {data.description}
      </Text>
      <MapView
        style={{ height: 300, width: "100%" }}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          title={data.title}
          description={data.description}
        />
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    width: 395,

    borderBottomColor: "lightgray",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  image: {
    height: 250,
    width: 395,
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 30,
    backgroundColor: "black",
    marginBottom: 15,
    padding: 10,
    width: 120,
    textAlign: "center",
  },
});
