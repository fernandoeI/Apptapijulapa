import React from "react";
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import GoButton from "../../components/GoButton";

import Icon from "react-native-vector-icons/Entypo";

export default function Decision(props) {
  return (
    <>
    <View style={styles.group}>
          <View style={styles.iconStack}>
            <Icon name="chevron-small-left" style={styles.icon}></Icon>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.button}
            ></TouchableOpacity>
          </View>
        </View>
    <ScrollView style={styles.viewBody} centerContent={true}>
      
      <Image
        source={require("../../../assets/images/undraw_trip_dv9f.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Selecciona lo que mejor te describa</Text>
      <Text style={styles.description}>
        Encuentra lo mejor y explora Tapijualapa, hoteles, restaurantes y
        experiencias todo en una sola aplicación. Regsitrate y comienza ahora!
      </Text>
      <View style={styles.viewBtn}>
        <GoButton screenName="Login" title="Soy un Prestador de Servicio" type="2" />
      </View>
      <View style={styles.viewBtn}>
        <GoButton screenName="Login" title="Soy un Turista" type="1" />
      </View>
    </ScrollView>
    </>
    
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    marginTop: Platform.OS === 'ios' ? "30%" : "15%",
    height: 300,
    width: "100%",
    marginBottom: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  btnStyle: {
    backgroundColor: "rgb(34, 21, 81)",
  },
  btnContainer: {
    width: "90%",
  },
  group: {
    marginTop:"10%",
    width: 49,
    height: 49,
  },
  iconStack: {
    width: 49,
    height: 49,
  },
  icon: {
    top: 3,
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button: {
    top: 0,
    left: 0,
    width: 49,
    height: 49,
    position: "absolute",
  },
});
