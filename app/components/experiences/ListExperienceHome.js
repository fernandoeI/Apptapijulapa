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
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListExperience(props) {
  const { experiences, isLoading, handleLoadMoreExperiences } = props;

  const navigation = useNavigation();
  return (
    <View>
      {size(experiences) > 0 ? (
        <FlatList
          data={experiences}
          horizontal={true}
          renderItem={(experience) => (
            <Experience experience={experience} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onEndReached={handleLoadMoreExperiences}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#150c35" />
          <Text style={{ textAlign: "center" }}>Cargando Experiencias</Text>
        </View>
      )}
    </View>
  );
}

function Experience(props) {
  const { experience, navigation } = props;
  const { id, name, area, image } = experience.item;
  const imageExperience = image ? image[0] : null;

  const goExperience = () => {
    navigation.navigate("Experience", {
      id,
      name,
    });
  };

  return (
    <TouchableOpacity onPress={goExperience} style={styles.buttonStack}>
      <Image
        source={
          imageExperience
            ? { uri: imageExperience }
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
        fadeDuration={30}
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
        <Text>Cargando más experiencias</Text>
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

  noMore: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    width: 133,
    marginRight: 15,
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
