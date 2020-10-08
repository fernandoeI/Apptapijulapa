import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import GoButton from "../../components/GoButton";

export default function Decision() {
  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/images/undraw_trip_dv9f.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Selecciona lo que mejor te describa</Text>
      <Text style={styles.description}>
        Encuentra lo mejor y explora Tapijualapa, hoteles, restaurantes y
        experiencias todo en una sola aplicación. Regsitrate y comienza ahora!
      </Text>
      <View style={styles.viewBtn}>
        <GoButton screenName="Login" title="Soy un Comerciante" type="2" />
      </View>
      <View style={styles.viewBtn}>
        <GoButton screenName="Login" title="Soy un Turista" type="1" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginTop: "30%",
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: "rgb(34, 21, 81)",
  },
  btnContainer: {
    width: "90%",
  },
});
