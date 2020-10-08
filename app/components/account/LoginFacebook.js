import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import { useNavigation } from "@react-navigation/native";

export default function LoginFacebook(props) {
  const { toastRef, type } = props;
  const navigation = useNavigation();

  const login = async () => {
    await Facebook.initializeAsync(FacebookApi.application_id);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      {
        permissions: FacebookApi.permissions,
      }
    );
    if (type === "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          navigation.navigate("Mi cuenta");
        })
        .catch(() => {
          toastRef.current.show("Error accediendo con Facebook");
        });
    } else if (type === "cancel") {
      toastRef.current.show("Inicio de sesión cancelado");
    } else {
      toastRef.current.show("Error al acceder. Intentelo más tarde");
    }
  };

  return (
    <SocialIcon
      title="Iniciar sesión con Facebook"
      button
      type="facebook"
      onPress={login}
    />
  );
}
