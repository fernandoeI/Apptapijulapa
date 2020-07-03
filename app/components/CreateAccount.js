import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccount({ screenName }) {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate(screenName)}
      >
        Registrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15
  },
  btnRegister: {
    color: "rgb(34, 21, 81 )",
    fontWeight: "bold"
  }
});
