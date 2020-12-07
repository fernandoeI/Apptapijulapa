import React, { useState } from "react";
import { SocialIcon } from "react-native-elements";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import { FacebookApi } from "../../utils/Social";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";



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

  // const loginWithApple = async () => {
  //   const csrf = Math.random().toString(36).substring(2, 15);
  //   const nonce = Math.random().toString(36).substring(2, 10);
  //   const hashedNonce = await Crypto.digestStringAsync(
  //     Crypto.CryptoDigestAlgorithm.SHA256, nonce);
  //   const appleCredential = await AppleAuthentication.signInAsync({
  //     requestedScopes: [
  //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //       AppleAuthentication.AppleAuthenticationScope.EMAIL
  //     ],
  //     state: csrf,
  //     nonce: hashedNonce
  //   });
  //   const { identityToken, email, state } = appleCredential;
  // }
  
  return (
    <>
    <SocialIcon
      title="Iniciar sesión con Facebook"
      button
      type="facebook"
      onPress={login}
    />
    {/* <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 250, height: 50 }}
          onPress={loginWithApple}
      /> */}
    <Loading isVisible={loading} text="Iniciando sesión" />
    </>
  );
}
