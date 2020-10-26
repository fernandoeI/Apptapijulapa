import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default function LoginFacebook(props) {
  const { toastRef } = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      await Facebook.initializeAsync({
        appId: FacebookApi.application_id,
      });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      {
        permissions: FacebookApi.permissions,
      }
    );
    if (type === "success") {
      setLoading(true);
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
       firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          setLoading(false);
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
  }catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <>
    <SocialIcon
      title="Iniciar sesión con Facebook"
      button
      type="facebook"
      onPress={login}
    />
    <Loading isVisible={loading} text="Iniciando sesión" />
    </>
  );
}
