import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
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
    <>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.button}
      >
        <Icon name="chevron-small-left" style={styles.icon} />
      </TouchableOpacity>
      <ScrollView
        style={styles.viewBody}
        centerContent={true}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../../assets/images/tapijulapa.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.viewContainer}>
          <LoginForm toastRef={toastRef} typeUser={type} />
          <CreateAccount screenName="Register" typeUser={type} />
        </View>
        <Divider stye={styles.divider} />
        <View style={styles.viewContainer}>
          {Platform.OS === "ios" ? (
            <View></View>
          ) : (
            <LoginFacebook toastRef={toastRef} typeUser={type} />
          )}
        </View>
        <Toast ref={toastRef} position="center" opacity={0.5} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 20,
    marginRight: 20,
  },
  logo: {
    height: 300,
    width: "70%",
    marginLeft: 60,
  },
  viewContainer: {
    marginRight: 20,
    marginLeft: 20,
  },
  divider: {
    backgroundColor: "rgb(34, 21, 81 )",
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button: {
    marginTop: 45,
    marginLeft: 10,
  },
});
