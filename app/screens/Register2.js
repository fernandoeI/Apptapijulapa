import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

function Register2(props) {
  return (
    <View style={styles.container}>
      <View style={styles.paso2De2Stack}>
        <Text style={styles.paso2De2}>Paso 2 de 2</Text>
        <Text style={styles.crearUnaCuenta1}>Crear una cuenta</Text>
      </View>
      <Text style={styles.cualEsTuNombre1}>Ingrese su correo electrónico</Text>
      <TextInput
        placeholder="   Amy"
        textBreakStrategy="simple"
        clearButtonMode="while-editing"
        autoCapitalize="words"
        style={styles.textInput1}
      ></TextInput>
      <TextInput
        placeholder="  *********"
        textBreakStrategy="simple"
        clearButtonMode="while-editing"
        autoCapitalize="none"
        secureTextEntry={true}
        maxLength={20}
        style={styles.textInput2}
      ></TextInput>
      <Text style={styles.cualEsTuNombre2}>Ingrese una contraseña</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Untitled3")}
        style={styles.button1}
      >
        <Text style={styles.continuar1}>Continuar</Text>
      </TouchableOpacity>
      <ImageBackground
        source={require("../assets/images/icons8-atrás-100.png")}
        resizeMode="contain"
        style={styles.image1}
        imageStyle={styles.image1_imageStyle}
      >
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.button2}
        ></TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250,250,250,1)",
  },
  paso2De2: {
    top: 11,
    left: 255,
    position: "absolute",
    color: "rgba(132,132,132,1)",
  },
  crearUnaCuenta1: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "#121212",
    height: 42,
    width: 268,
    fontSize: 28,
  },
  paso2De2Stack: {
    width: 328,
    height: 42,
    marginTop: 111,
    marginLeft: 27,
  },
  cualEsTuNombre1: {
    color: "rgba(132,132,132,1)",
    marginTop: 25,
    marginLeft: 28,
  },
  textInput1: {
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
  textInput2: {
    color: "rgba(0,0,0,1)",
    width: 329,
    height: 42,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 60,
    marginLeft: 27,
  },
  cualEsTuNombre2: {
    color: "rgba(132,132,132,1)",
    marginTop: -75,
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
    marginTop: 355,
    marginLeft: 30,
  },
  continuar1: {
    color: "rgba(255,255,255,1)",
    fontSize: 28,
    marginTop: 20,
    marginLeft: 96,
  },
  image1: {
    width: 25,
    height: 25,
    marginTop: -663,
    marginLeft: 27,
  },
  image1_imageStyle: {},
  button2: {
    width: 25,
    height: 25,
  },
});

export default Register2;
