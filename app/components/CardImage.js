import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

function CardImage(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => console.log("Navigate to Lugares")}
        style={styles.button}
      >
        <View style={styles.buttonStack}>
          <Image
            source={require("../../assets/images/exconvento1.jpg")}
            resizeMode="cover"
            style={styles.image1}
          ></Image>
          <Text style={styles.oxolotan}>Oxolotán</Text>
          <Text style={styles.exConvento}>Ex Convento</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    width: 133,
    height: 223,
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

export default CardImage;
