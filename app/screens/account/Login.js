import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import CreateAccount from "../../components/CreateAccount";
import LoginForm from "../../components/account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/account/LoginFacebook";

export default function Login(props) {
  const { route } = props;
  const { type } = route.params;

  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/tapijulapa.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} typeUser={type} />
        <CreateAccount screenName="Register" typeUser={type} />
      </View>
      <Divider stye={styles.divider} />
      <View style={styles.viewContainer}>
        <LoginFacebook toastRef={toastRef} typeUser={type} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 60,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 20,
  },
  divider: {
    backgroundColor: "rgb(34, 21, 81 )",
  },
});
