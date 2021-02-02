import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RegisterForm from "../../components/account/RegisterForm";
import Toast from "react-native-easy-toast";

import Icon from "react-native-vector-icons/Entypo";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register(props) {
  const { route } = props;
  const { typeUser } = route.params;

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
          <View style={styles.viewForm}>
            <RegisterForm toastRef={toastRef} typeUser={typeUser} />
          </View>
        </KeyboardAwareScrollView>
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
  viewForm: {
    marginRight: 20,
    marginLeft: 20,
  },
  group: {
    marginTop: "10%",
    width: 49,
    height: 49,
  },
  iconStack: {
    width: 49,
    height: 49,
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
