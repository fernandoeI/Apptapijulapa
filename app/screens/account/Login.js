import React, { useRef } from "react";
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import CreateAccount from "../../components/CreateAccount";
import LoginForm from "../../components/account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/account/LoginFacebook";
import Icon from "react-native-vector-icons/Entypo";

export default function Login(props) {
  const { route } = props;
  const { type } = route.params;

  const toastRef = useRef();
  return (
    <ScrollView>
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
