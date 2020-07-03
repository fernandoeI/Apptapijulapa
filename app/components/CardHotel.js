import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";

function CardHotel(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => console.log("Navigate to DescriptionHoteles")}
        style={styles.button2}
      >
        <View style={styles.image2Row}>
          <Image
            source={require("../../assets/images/hoteli.jpg")}
            resizeMode="cover"
            style={styles.image2}
          ></Image>
          <View style={styles.casaTapijulapaColumn}>
            <Text style={styles.casaTapijulapa}>
              {props.casaTapijulapa || "Casa Tapijulapa"}
            </Text>
            <Text style={styles.desde350LaNoche}>
              {props.desde350LaNoche || "Desde $350 la noche"}
            </Text>
          </View>
          <Text style={styles.loremIpsum1}>{props.loremIpsum1 || "4.9"}</Text>
          <Image
            source={require("../../assets/images/icons8-estrella-96.png")}
            resizeMode="contain"
            style={styles.image3}
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  button2: {
    width: 317,
    height: 92,
  },
  image2: {
    width: 73,
    height: 77,
    borderRadius: 10,
  },
  casaTapijulapa: {
    color: "#121212",
  },
  desde350LaNoche: {
    color: "#121212",
    fontSize: 12,
    marginTop: 7,
  },
  casaTapijulapaColumn: {
    width: 124,
    marginLeft: 11,
    marginTop: 22,
    marginBottom: 17,
  },
  loremIpsum1: {
    color: "#121212",
    fontSize: 12,
    marginLeft: 65,
    marginTop: 31,
  },
  image3: {
    width: 15,
    height: 15,
    marginTop: 31,
  },
  image2Row: {
    height: 77,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 7,
    marginRight: 5,
  },
});

export default CardHotel;
