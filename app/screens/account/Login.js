import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Linking
} from "react-native";
import { Divider } from "react-native-elements";
import CreateAccount from "../../components/CreateAccount";
import LoginForm from "../../components/account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../components/account/LoginFacebook";
import Icon from "react-native-vector-icons/Entypo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login(props) {
  const { route } = props;
  const { type } = route.params;

  const toastRef = useRef();
  return (
    <>
      <ScrollView
        style={styles.viewBody}
        centerContent={true}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAwareScrollView>
          <Image
            source={require("../../../assets/images/tapijulapa.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.viewContainer}>
            <LoginForm toastRef={toastRef} typeUser={type} />

            <CreateAccount screenName="Register" typeUser={type} />
          </View>
        </KeyboardAwareScrollView>
        <Divider stye={styles.divider} />
        <View style={styles.viewContainer}>
          {Platform.OS === "ios" ? (
            <View></View>
          ) : (
            <>
              <LoginFacebook toastRef={toastRef} typeUser={type} />
              <Text style={{ textAlign: "center" }} >Al registrarte, aceptas </Text>
              <Text style={{ textAlign: "center" }} >nuestras <Text onPress={() => Linking.openURL("https://firebasestorage.googleapis.com/v0/b/tapijulapa-a1a12.appspot.com/o/PoliticaDePrivacidad.pdf?alt=media&token=f912de00-5b94-40f3-b984-80e9b73b33da")} style={{ color: "blue" }}>condiciones del servicio.</Text></Text>

            </>

          )}
        </View>
        <Toast ref={toastRef} position="center" opacity={0.5} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.button}
      >
        <Icon name="chevron-small-left" style={styles.icon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "transparent",
  },
  logo: {
    height: 180,
    width: "70%",
    marginLeft: "15%",
    marginTop: "10%",
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
    position: "absolute",
    marginTop: 45,
    marginLeft: 10,
    width: 50,
  },
});
