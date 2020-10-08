import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccount(props) {
  const { screenName, typeUser } = props;
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no tienes una cuenta?{"  "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate(screenName, { typeUser })}
      >
        Registrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  textRegister: {
    marginTop: 15,

    marginBottom: 15,
    textAlign: "center",
  },
  btnRegister: {
    color: "rgb(34, 21, 81 )",
    fontWeight: "bold",
  },
});
