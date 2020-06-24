import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function GoButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      buttonStyle={styles.btnStyle}
      containerStyle={styles.btnContainer}
      title="Ver tu perfil"
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "rgb(34, 21, 81)"
  },
  btnContainer: {
    width: "70%"
  }
});
