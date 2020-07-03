import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";

function Register(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/icons8-atrás-100.png")}
        resizeMode="contain"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.button2}
        ></TouchableOpacity>
      </ImageBackground>
      <View style={styles.crearUnaCuentaStack}>
        <Text style={styles.crearUnaCuenta}>Crear una cuenta</Text>
        <Text style={styles.paso1De2}>Paso 1 de 2</Text>
      </View>
      <Text style={styles.cualEsTuNombre}>¿Cuál es tu nombre?</Text>
      <TextInput
        placeholder="   Amy"
        textBreakStrategy="simple"
        clearButtonMode="while-editing"
        autoCapitalize="words"
        style={styles.textInput}
      ></TextInput>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Untitled2")}
        style={styles.button1}
      >
        <Text style={styles.continuar}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(249,249,249,1)",
  },
  image: {
    width: 25,
    height: 25,
    marginTop: 58,
    marginLeft: 27,
  },
  image_imageStyle: {},
  button2: {
    width: 25,
    height: 25,
  },
  crearUnaCuenta: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "#121212",
    height: 42,
    width: 268,
    fontSize: 28,
  },
  paso1De2: {
    top: 11,
    left: 255,
    position: "absolute",
    color: "rgba(132,132,132,1)",
  },
  crearUnaCuentaStack: {
    width: 328,
    height: 42,
    marginTop: 28,
    marginLeft: 27,
  },
  cualEsTuNombre: {
    color: "rgba(132,132,132,1)",
    marginTop: 25,
    marginLeft: 28,
  },
  textInput: {
    color: "rgba(0,0,0,1)",
    width: 329,
    height: 42,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 14,
    marginLeft: 27,
  },
  button1: {
    width: 314,
    height: 73,
    backgroundColor: "rgba(32,14,50,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
    borderRadius: 15,
    marginTop: 398,
    marginLeft: 30,
  },
  continuar: {
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    marginTop: 20,
    marginLeft: 96,
  },
});

export default Register;
