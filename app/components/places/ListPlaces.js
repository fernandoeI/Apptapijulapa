import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import * as firebase from "firebase";

export default function ListPlaces(props) {
  const { places, isLoading, handleLoadMore } = props;

  return (
    <View>
      {places ? (
        <FlatList
          data={places}
          renderItem={(place) => <Place place={place} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderPlaces}>
          <ActivityIndicator size="large" />
          <Text>Cargando lugares</Text>
        </View>
      )}
    </View>
  );
}

function Place(props) {
  const { place } = props;
  const { name, address, description, image } = place.item.place;
  const [imagePlace, setImagePlace] = useState(null);

  useEffect(() => {
    const images = image[0];
    firebase
      .storage()
      .ref(`place-image/${images}`)
      .getDownloadURL()
      .then((result) => {
        setImagePlace(result);
      });
  });

  return (
    <TouchableOpacity onPress={() => console.log("Ir al lugar")}>
      <View style={styles.viewPlace}>
        <View style={styles.viewPlaceImage}>
          <Image
            resizeMode="cover"
            source={{ uri: imagePlace }}
            style={styles.imagePlace}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
        </View>
        <View>
          <Text style={styles.placeName}>{name}</Text>
          <Text style={styles.placeAddress}>{address}</Text>
          <Text style={styles.placeDescription}>
            {description.substr(0, 60)}...
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
      <View style={styles.loadingPlaces}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundPlace}>
        <Text>No quedan lugares por cargar</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingPlaces: {
    marginTop: 20,
    alignItems: "center",
  },
  viewPlace: {
    flexDirection: "row",
    margin: 10,
  },
  viewPlaceImage: {
    marginRight: 15,
  },
  imagePlace: {
    width: 100,
    height: 100,
  },
  placeName: {
    fontWeight: "bold",
  },
  placeAddress: {
    paddingTop: 2,
    color: "grey",
  },
  placeDescription: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  loaderPlaces: {
    marginBottom: 10,
    marginTop: 10,
  },
  notFoundPlace: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
});
