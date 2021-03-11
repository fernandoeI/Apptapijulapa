import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
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
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#150c35" />
          <Text style={{ textAlign: "center" }}>Cargando Sitios</Text>
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
    <TouchableOpacity onPress={goPlace} style={styles.buttonStack}>
      <Image
        source={
          imagePlace
            ? { uri: imagePlace }
            : require("../../../assets/img/noimage.jpg")
        }
        resizeMode="cover"
        containerStyle={styles.image1}
        PlaceholderContent={<ActivityIndicator size="large" color="#150c35" />}
        placeholderStyle={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#f2f2f2",
        }}
        fadeDuration={1}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.area}>{area}</Text>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.noMore}>
        <ActivityIndicator size="large" color="#150c35" />
        <Text>Cargando más sitios</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.noMore}>
        <Text style={{ textAlign: "center" }}>Echa un vistazo de nuevo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },

  noMore: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    width: 133,
    marginRight: 30,
  },
  image1: {
    width: 133,
    height: 149,
    borderWidth: 1,
    borderColor: "rgba(249,249,249,1)",
    borderRadius: 10,
    overflow: "hidden",
  },
  area: {
    color: "rgba(132,132,132,1)",
    marginTop: 5,
  },
  name: {
    color: "rgba(0,0,0,1)",
    fontSize: 16,
    marginTop: 10,
  },
  buttonStack: {
    marginLeft: 15,
    width: 133,
  },
});
