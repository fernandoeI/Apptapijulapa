import React, { useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import RegisterForm from "../../components/account/RegisterForm";
import Toast from "react-native-easy-toast";

export default function Register(props) {
  const { route } = props;
  const { typeUser } = route.params;

  const toastRef = useRef();
  return (
    <>
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
});
