import React, { useRef } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import RegisterForm from "../../components/account/RegisterForm";
import Toast from "react-native-easy-toast";

import Icon from "react-native-vector-icons/Entypo";

export default function Register(props) {
  const { route } = props;
  const { typeUser } = route.params;

  const toastRef = useRef();
  return (
    <>
    <View style={styles.group}>
          <View style={styles.iconStack}>
            <Icon name="chevron-small-left" style={styles.icon}></Icon>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.button}
            ></TouchableOpacity>
          </View>
        </View>
      <Image
        source={require("../../../assets/img/tapijulapa.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef} typeUser={typeUser} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 60,
  },
  viewForm: {
    marginLeft: 40,
    marginRight: 40,
  },
  group: {
    marginTop:"10%",
    width: 49,
    height: 49,
  },
  iconStack: {
    width: 49,
    height: 49,
  },
  icon: {
    top: 3,
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button: {
    top: 0,
    left: 0,
    width: 49,
    height: 49,
    position: "absolute",
  },
});
