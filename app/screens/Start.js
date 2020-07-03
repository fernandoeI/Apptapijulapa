import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

function Start(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/undraw_travelers_qlt1_(1).png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <Text style={styles.loremIpsum}>
        Encuentra lo mejor y explora Tapijualapa, hoteles, restaurantes y
        experiencias todo en una sola aplicación. Regsitrate y comienza ahora!
      </Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Untitled1")}
        style={styles.button}
      >
        <Text style={styles.comenzar}>Comenzar</Text>
      </TouchableOpacity>
      <Image
        source={require("../assets/images/tapijulapa.png")}
        resizeMode="contain"
        style={styles.image2}
      ></Image>
      <Text style={styles.descubreTapijulapa}>Descubre Tapijulapa</Text>
      <View style={styles.loremIpsum3Row}>
        <Text style={styles.loremIpsum3}>¿Ya tiene una cuenta?</Text>
        <Text style={styles.inicieSesion}>Inicie Sesión</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  image: {
    width: 199,
    height: 199,
    marginTop: 226,
    marginLeft: 88,
  },
  loremIpsum: {
    color: "#121212",
    height: 69,
    width: 314,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 84,
    marginLeft: 30,
  },
  button: {
    width: 314,
    height: 73,
    backgroundColor: "rgba(32,14,50,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 15,
    marginTop: 70,
    marginLeft: 30,
  },
  comenzar: {
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    marginTop: 20,
    marginLeft: 96,
  },
  image2: {
    width: 141,
    height: 141,
    marginTop: -655,
    marginLeft: 117,
  },
  descubreTapijulapa: {
    color: "#121212",
    lineHeight: 15,
    fontSize: 32,
    marginTop: 263,
    marginLeft: 43,
  },
  loremIpsum3: {
    color: "#121212",
    fontSize: 12,
  },
  inicieSesion: {
    color: "rgba(32,14,50,1)",
    fontSize: 12,
    marginLeft: 5,
  },
  loremIpsum3Row: {
    height: 14,
    flexDirection: "row",
    marginTop: 256,
    marginLeft: 90,
    marginRight: 96,
  },
});

export default Start;
