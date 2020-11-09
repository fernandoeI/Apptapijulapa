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
  return (
    <View>
      {size(places) > 0 ? (
        <FlatList
          data={places}
          renderItem={(place) => (
            <Place place={place} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={styles.noMore}>Cargando Lugares</Text>
        </View>
      )}
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
    <TouchableOpacity onPress={goPlace}>
      <View style={styles.viewRestaurant}>
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
        </View>
        <View style={{ width: "75%" }}>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantAddress}>{area}</Text>

          <Text style={styles.rating}>
            {rating}{" "}
            <Image
              source={require("../../../assets/images/icons8-estrella-96.png")}
              style={styles.star}
            />
          </Text>
          <Text style={styles.restaurantDescription}>
            {price == null || price == 0 ? "Gratis" : "Desde: $" + price}
          </Text>
        </View>
      </View>
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
  loaderRestaurants: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewRestaurant: {
    flexDirection: "row",
    margin: 10,
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#F2F2F2"
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
    position: "absolute",
    right: 15,
    top: 20,
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
