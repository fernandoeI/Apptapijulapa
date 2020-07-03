import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Navigation from "../../navigation/Navigation";

export default function RegisterForm(props) {
  const navigation = useNavigation();
  console.log(props);
  const { toastRef } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordRepeat, setHidePasswordRepeat] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordRepeat, setpasswordRepeat] = useState("");

  const register = async () => {
    if (!email || !password || !passwordRepeat) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (password !== passwordRepeat) {
          toastRef.current.show("Las contraseñas no son iguales");
        } else {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("Mi cuenta");
            })
            .catch(() => {
              toastRef.current.show(
                "Error al crear la cuenta, intentelo más tarde"
              );
            });
        }
      }
    }
  };

  return (
    <View stye={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password="true"
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={e => setpassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />

      <Input
        placeholder="Repetir contraseña"
        password="true"
        secureTextEntry={hidePasswordRepeat}
        containerStyle={styles.inputForm}
        onChange={e => setpasswordRepeat(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePasswordRepeat ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePasswordRepeat(!hidePasswordRepeat)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%"
  },
  btnRegister: {
    backgroundColor: "rgb(34, 21, 81 )"
  }
});
