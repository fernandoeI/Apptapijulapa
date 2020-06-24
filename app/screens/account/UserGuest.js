import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import GoButton from "../../components/GoButton";

export default function UserGuest({ navigation }) {
  return (
    <ScrollView style={styles.viewBody} centerContent={true}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Consulta tu perfil</Text>
      <Text style={styles.description}>
        ¿Cómo describirías el mejor servicio? Busca y visualiza los mejores
        lugares en Tapijulapa de una forma sencilla, calificalos y comenta cual
        ha sido tu experiencia.
      </Text>
      <View style={styles.viewBtn}>
        <GoButton screenName="Login" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center"
  },
  description: {
    textAlign: "center",
    marginBottom: 20
  },
  viewBtn: {
    flex: 1,
    alignItems: "center"
  },
  btnStyle: {
    backgroundColor: "rgb(34, 21, 81)"
  },
  btnContainer: {
    width: "70%"
  }
});
