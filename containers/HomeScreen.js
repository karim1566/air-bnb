import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { ActivityIndicator } from "react-native-paper";

export default function HomeScreen() {
  const [data, setData] = useState();
  const [isloading, setIsloading] = useState(true);
  const navigation = useNavigation();

  const star = <FontAwesome name="star" size={24} color="gold" />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );

        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isloading === true ? (
    <ActivityIndicator />
  ) : (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const price = item.price;
          return (
            <View style={styles.block}>
              <SwiperFlatList
                // autoplay
                // autoplayDelay={2}
                // autoplayLoop
                // index={2}
                // showPagination
                data={item.photos}
                renderItem={({ item }) => {
                  return (
                    <View style={{ height: 200 }}>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("room", { id: item._id });
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{item.title}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>{star}</Text>
                    <Text style={{ color: "gray" }}>
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>

                <Image
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                  source={{ uri: item.user.account.photo.url }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    width: 370,
    marginLeft: 10,
    borderBottomColor: "lightgray",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  image: {
    height: 200,
    width: 370,
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "black",
    marginBottom: 15,
    padding: 10,
    width: 120,
    textAlign: "center",
  },
});
