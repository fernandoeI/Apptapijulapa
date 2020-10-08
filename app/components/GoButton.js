import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function GoButton(props) {
  const { screenName, title, type } = props;
  const navigation = useNavigation();
  return (
    <Button
      buttonStyle={styles.btnStyle}
      containerStyle={styles.btnContainer}
      title={title}
      onPress={() => navigation.navigate(screenName, { type })}
    />
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "rgb(34, 21, 81)",
  },
  btnContainer: {
    width: "80%",
  },
});
