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
import * as firebase from "firebase";
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
          horizontal={true}
          renderItem={(place) => (
            <Place place={place} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View>
          <ActivityIndicator size="large" />
          <Text>Cargando Lugares</Text>
        </View>
      )}
    </View>
  );
}

function Place(props) {
  const { place, navigation } = props;
  const { id, name, area, image } = place.item;
  const imagePlace = image ? image[0] : null;

  const goPlace = () => {
    navigation.navigate("Place", {
      id,
      name,
    });
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity onPress={goPlace} style={styles.button}>
        <View style={styles.buttonStack}>
          <Image
            source={
              imagePlace
                ? { uri: imagePlace }
                : require("../../../assets/img/noimage.jpg")
            }
            resizeMode="cover"
            style={styles.image1}
            PlaceholderContent={<ActivityIndicator color="fff" />}
          />
          <Text style={styles.oxolotan}>{area}</Text>
          <Text style={styles.exConvento}>{name}</Text>
        </View>
      </TouchableOpacity>
    </View>
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
  container: {
    marginRight: 15,
  },
  button: {
    width: 133,
    height: 223,
  },
  noMore: {
    textAlign: "center",
    width: 133,
    height: 223,
    marginRight: 20,
    alignItems: "center",
  },
  image1: {
    width: 133,
    height: 149,
    borderWidth: 1,
    borderColor: "rgba(249,249,249,1)",
    borderRadius: 10,
  },
  oxolotan: {
    top: 185,
    left: 0,
    position: "absolute",
    color: "rgba(132,132,132,1)",
  },
  exConvento: {
    top: 160,
    left: 0,
    position: "absolute",
    color: "rgba(0,0,0,1)",
    fontSize: 16,
  },
  buttonStack: {
    width: 133,
    height: 223,
  },
});
