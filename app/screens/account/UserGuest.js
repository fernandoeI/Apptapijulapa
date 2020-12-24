import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import GoButton from "../../components/GoButton";

export default function UserGuest({ navigation }) {
  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/images/undraw_mobile_login_ikmv.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.description}>
        Encuentra lo mejor y explora Tapijualapa, hoteles, restaurantes y
        experiencias todo en una sola aplicación. Registrate y comienza ahora!
      </Text>
      <View style={styles.viewBtn}>
        <GoButton screenName="Decision" title="Inicia Sesión" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 250,
    width: "100%",
  },

  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "rgb(34, 21, 81)",
  },
  btnContainer: {
    width: "70%",
  },
});
