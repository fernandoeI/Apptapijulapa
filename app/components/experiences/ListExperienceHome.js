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
        <View style={{ paddingTop: 60 }}>
          <ActivityIndicator size="large" />
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
    <View style={[styles.container, props.style]}>
      <TouchableOpacity onPress={goExperience} style={styles.button}>
        <View style={styles.buttonStack}>
          <Image
            source={
              imageExperience
                ? { uri: imageExperience }
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
