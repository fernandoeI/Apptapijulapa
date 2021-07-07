import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import GoButton from "../../components/GoButton";

export default function UserGuest({ navigation }) {
  return (
    <ScrollView
      style={styles.viewBody}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../../assets/images/undraw_mobile_login_ikmv.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.description}>
        Encuentra lo mejor y explora Tapijulapa, hoteles, restaurantes y
        experiencias todo en una sola aplicación. Registrate y comienza ahora!
      </Text>
      <GoButton screenName="Decision" title="Inicia Sesión" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: "50%",
    width: "90%",
    marginBottom: 15,
    marginLeft: 15,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  btnStyle: {
    backgroundColor: "rgb(34, 21, 81)",
  },
  btnContainer: {
    width: "70%",
  },
});
