import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListPlaces(props) {
  const { places, isLoading, handleLoadMore } = props;

  const navigation = useNavigation();
  return size(places) > 0 ? (
    <FlatList
      data={places}
      renderItem={(place) => <Place place={place} navigation={navigation} />}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<FooterList isLoading={isLoading} />}
    />
  ) : (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.noMore}>Cargando Sitios</Text>
    </View>
  );
}

function Place(props) {
  const { place, navigation } = props;
  const { id, name, area, image, price, rating } = place.item;
  const imagePlace = image ? image[0] : null;

  const goPlace = () => {
    navigation.navigate("Place", {
      id,
    });
  };

  return (
    <TouchableOpacity onPress={goPlace} style={styles.viewRestaurant}>
      <View style={styles.viewRestaurantImage}>
        <Image
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator color="fff" />}
          source={
            imagePlace
              ? { uri: imagePlace }
              : require("../../../assets/img/noimage.jpg")
          }
          style={styles.imageRestaurant}
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
        <ActivityIndicator size="large" />
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
    borderRadius: 10,
    borderColor: "#f2f2f2",
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
