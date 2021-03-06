import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";

export default function ListExperiences(props) {
  const { experiences, isLoading } = props;

  const navigation = useNavigation();
  return size(experiences) > 0 ? (
    <FlatList
      data={experiences}
      renderItem={(experience) => (
        <Experience experience={experience} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<FooterList isLoading={isLoading} />}
    />
  ) : (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#150c35" />
      <Text style={styles.noMore}>Cargando Experiencias</Text>
    </View>
  );
}

function Experience(props) {
  const { experience, navigation } = props;
  const { id, name, area, image, price, rating } = experience.item;
  const imageExperience = image ? image[0] : null;

  const goExperience = () => {
    navigation.navigate("Experience", {
      id,
    });
  };

  return (
    <TouchableOpacity onPress={goExperience} style={styles.viewRestaurant}>
      <View style={styles.viewRestaurantImage}>
        <Image
          resizeMode="cover"
          PlaceholderContent={
            <ActivityIndicator color="#150c35" size="large" />
          }
          placeholderStyle={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#f2f2f2",
          }}
          source={
            imageExperience
              ? { uri: imageExperience }
              : require("../../../assets/img/noimage.jpg")
          }
          containerStyle={styles.imageRestaurant}
        />
        <View style={styles.viewrestaurantInfo}>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantAddress}>{area}</Text>
          <Text style={styles.restaurantDescription}>
            {price == null || price == 0 ? "Gratis" : "Desde: $" + price}
          </Text>
        </View>
      </View>

      <Text style={styles.rating}>
        {rating}{" "}
        <Image
          source={require("../../../assets/images/icons8-estrella-96.png")}
          style={styles.star}
        />
      </Text>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.noMore}>
        <ActivityIndicator size="large" color="#150c35" />
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.noMore}>Echa un vistazo de nuevo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewRestaurant: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewRestaurantImage: {
    marginRight: 15,
    width: "80%",
    flexDirection: "row",
  },
  viewrestaurantInfo: {
    marginLeft: 10,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "rgba(249,249,249,1)",
    borderRadius: 10,
    overflow: "hidden",
  },
  restaurantName: {
    marginTop: 5,
    fontWeight: "bold",
  },
  restaurantAddress: {
    paddingTop: 2,
    color: "grey",
  },
  restaurantDescription: {
    paddingTop: 2,
    color: "grey",
    width: 250,
  },
  notFoundRestaurants: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  rating: {
    marginRight: 15,
    marginTop: 30,
  },
  star: {
    width: 15,
    height: 15,
  },
  noMore: {
    textAlign: "center",
    marginBottom: 20,
  },
});
