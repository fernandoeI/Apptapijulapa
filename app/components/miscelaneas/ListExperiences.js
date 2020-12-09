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

export default function ListExperiences(props) {
  const { experiences, isLoading, handleLoadMore } = props;

  const navigation = useNavigation();
  return (
    <View>
      {size(experiences) > 0 ? (
        <FlatList
          data={experiences}
          renderItem={(experience) => (
            <Experience experience={experience} navigation={navigation} />
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
          <Text style={styles.noMore}>Cargando Miscelaneas</Text>
        </View>
      )}
    </View>
  );
}

function Experience(props) {
  const { experience, navigation } = props;
  const { id, name, area, image, price, rating } = experience.item;
  const imageExperience = image ? image[0] : null;

  const goExperience = () => {
    navigation.navigate("DescriptionMiscelaneaScreen", {
      id,
    });
  };

  return (
    <TouchableOpacity onPress={goExperience}>
      <View style={styles.viewRestaurant}>
        <View style={styles.viewRestaurantImage}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="fff" />}
            source={
              imageExperience
                ? { uri: imageExperience }
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
    flex: 1,
    alignItems: "center",
  },
  viewRestaurantImage: {
    marginRight: 15,
  },
  imageRestaurant: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f2f2f2"
  },
  restaurantName: {
    marginTop: 5,
    fontWeight: "bold",
    width: "80%"
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
