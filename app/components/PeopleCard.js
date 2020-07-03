import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function PeopleCard(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect3}>
        <View style={styles.image4Row}>
          <Image
            source={require("../assets/images/3.jpg")}
            resizeMode="contain"
            style={styles.image4}
          ></Image>
          <View style={styles.alexanderGonzalezColumn}>
            <Text style={styles.alexanderGonzalez}>Alexander González</Text>
            <Text style={styles.guiaCertificado}>Guía certificado</Text>
            <View style={styles.image7Row}>
              <Image
                source={require("../assets/images/icons8-whatsapp-80.png")}
                resizeMode="contain"
                style={styles.image7}
              ></Image>
              <Image
                source={require("../assets/images/icons8-facebook-rodeado-de-círculo-80.png")}
                resizeMode="contain"
                style={styles.image5}
              ></Image>
            </View>
          </View>
          <Image
            source={require("../assets/images/icons8-facebook-messenger-80.png")}
            resizeMode="contain"
            style={styles.image6}
          ></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect3: {
    width: 335,
    height: 122,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(250,250,250,1)",
    borderRadius: 10,
  },
  image4: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "rgba(250,250,250,1)",
    borderRadius: 100,
  },
  alexanderGonzalez: {
    color: "#121212",
  },
  guiaCertificado: {
    color: "rgba(64,64,64,1)",
  },
  image7: {
    width: 45,
    height: 45,
  },
  image5: {
    width: 45,
    height: 45,
    marginLeft: 20,
  },
  image7Row: {
    height: 45,
    flexDirection: "row",
    marginTop: 6,
    marginRight: 16,
  },
  alexanderGonzalezColumn: {
    width: 126,
    marginLeft: 28,
    marginTop: 5,
  },
  image6: {
    width: 45,
    height: 45,
    marginLeft: 7,
    marginTop: 45,
  },
  image4Row: {
    height: 90,
    flexDirection: "row",
    marginTop: 16,
    marginLeft: 16,
    marginRight: 23,
  },
});

export default PeopleCard;
