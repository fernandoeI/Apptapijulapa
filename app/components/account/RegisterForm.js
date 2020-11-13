import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/Validation";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Navigation from "../../navigation/Navigation";
import RNPickerSelect from "react-native-picker-select";

import { firebaseApp } from "../../utils/FireBase";
import firebasee from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const db = firebasee.firestore(firebaseApp);

export default function RegisterForm(props) {
  const { toastRef, typeUser } = props;
  const [hidePassword, setHidePassword] = useState(false);
  const [hidePasswordRepeat, setHidePasswordRepeat] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();

  const onSubmit = () => {
    if (typeUser === "1") {
      setFormData({ ...formData, ["type"]: "turista" });
    }
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.passwordRepeat)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(formData.email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        if (formData.password !== formData.passwordRepeat) {
          toastRef.current.show("Las contraseñas no son iguales");
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
              let uid = firebase.auth().currentUser.uid;
              db.collection("users")
                .doc(uid)
                .set({
                  role: typeUser,
                  createBy: uid,
                  giro: formData.type ? formData.type : "turista",
                  name: "",
                  area: "",
                  description: "",
                  bestMonths: "",
                  days: "",
                  open: "",
                  close: "",
                  address: "",
                  isVisible: formData.type === "turista" ? true : false,
                  location: [],
                  price: "",
                  image: [],
                  rating: 0,
                  ratingTotal: 0,
                  quantityVoting: 0,
                  createAt: new Date(),
                  ratingOrder: "0",
                })
                .then(() => {
                  navigation.navigate("Mi cuenta");
                })
                .catch((error) => {
                  toastRef.current.show(
                    "El usuario ya se ha registrado. Inicie sesión"
                  );
                });
            })
            .catch(() => {
              toastRef.current.show(
                "La contraseña debe tener al menos 6 carácteres"
              );
            });
        }
      }
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View stye={styles.formContainer} behavior="padding" enabled>
      {typeUser === "2" ? (
        <RNPickerSelect
          placeholder={{ label: "Giro del comercio" }}
          items={[
            { label: "Hotel", value: "hotel" },
            { label: "Restaurante", value: "restaurant" },
            { label: "Artesanias", value: "artesania" },
            { label: "Miscelanea", value: "miscelanea" },
            { label: "Guías", value: "guia" },
            { label: "Otros", value: "Otro" },
          ]}
          onValueChange={(e) => setFormData({ ...formData, ["type"]: e })}
          useNativeAndroidPickerStyle={false}
          style={{
            inputIOS: {
              width: "95%",
              marginTop: 20,
              marginLeft: 10,
              fontSize: 18,
              lineHeight: 20,
              borderBottomColor: "#96989A",
              borderBottomWidth: 1.2,
              color:"#9c9c9c",
              paddingBottom: 10
            },
            inputAndroid: {
              width: "95%",
              marginTop: 20,
              marginLeft: 10,
              lineHeight: 50,
              borderBottomColor: "#96989A",
              borderBottomWidth: 1.2,
              fontSize: 18,
              color:"#9c9c9c",
            },
          }}
        />
      ) : (
        <View></View>
      )}

      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
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
        secureTextEntry={hidePassword ? false : true}
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "password")}
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
        secureTextEntry={hidePasswordRepeat ? false : true}
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "passwordRepeat")}
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
        onPress={onSubmit}
      />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    passwordRepeat: "",
    type: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRight: {
    color: "#c1c1c1",
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "rgb(34, 21, 81 )",
  },
});
