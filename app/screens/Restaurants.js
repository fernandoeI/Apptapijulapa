import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import Svg, { Ellipse } from "react-native-svg";
import CardHotel from "../components/CardHotel";
import BarMenu from "../components/BarMenu";

function SearchRestaurants(props) {
  return (
    <View style={styles.container}>
      <View style={styles.groupRow}>
        <View style={styles.group}>
          <View style={styles.iconStack}>
            <Icon name="chevron-small-left" style={styles.icon}></Icon>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.button}
            ></TouchableOpacity>
          </View>
        </View>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 52.67 52.67" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(255,255,255,1)"
              cx={26}
              cy={26}
              rx={26}
              ry={26}
            ></Ellipse>
          </Svg>
          <Image
            source={require("../../assets/images/icons8-mesa-de-restaurante-96.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
        </View>
      </View>
      <Text style={styles.loremIpsum}>20 Restaurantes</Text>
      <TextInput
        placeholder="   Buscar restaurantes"
        style={styles.textInput}
      ></TextInput>
      <View style={styles.todosLosHotelesRow}>
        <Text style={styles.todosLosHoteles}>Todos los restaurantes</Text>
        <Text style={styles.ordenar}>Ordenar</Text>
      </View>
      <View style={styles.scrollArea}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <CardHotel
            loremIpsum1="4.5"
            desde350LaNoche="$75 - $500"
            casaTapijulapa="El Sabor de la Sierra"
            style={styles.cardHotel}
          ></CardHotel>
          <CardHotel
            loremIpsum1="4.5"
            desde350LaNoche="$75 - $500"
            casaTapijulapa="El Sabor de la Sierra"
            style={styles.cardHotel1}
          ></CardHotel>
          <CardHotel
            loremIpsum1="4.5"
            desde350LaNoche="$75 - $500"
            casaTapijulapa="El Sabor de la Sierra"
            style={styles.cardHotel2}
          ></CardHotel>
          <CardHotel
            loremIpsum1="4.5"
            desde350LaNoche="$75 - $500"
            casaTapijulapa="El Sabor de la Sierra"
            style={styles.cardHotel3}
          ></CardHotel>
          <CardHotel
            loremIpsum1="4.5"
            desde350LaNoche="$75 - $500"
            casaTapijulapa="El Sabor de la Sierra"
            style={styles.cardHotel4}
          ></CardHotel>
        </ScrollView>
      </View>
      <BarMenu style={styles.barMenu1}></BarMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250,250,250,1)",
  },
  group: {
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
  iconStack: {
    width: 49,
    height: 49,
  },
  ellipse: {
    top: 0,
    width: 53,
    height: 53,
    position: "absolute",
    left: 0,
  },
  image: {
    top: 8,
    left: 10,
    width: 33,
    height: 33,
    position: "absolute",
  },
  ellipseStack: {
    width: 53,
    height: 53,
    marginLeft: 101,
  },
  groupRow: {
    height: 53,
    flexDirection: "row",
    marginTop: 48,
    marginLeft: 11,
    marginRight: 161,
  },
  loremIpsum: {
    color: "#121212",
    fontSize: 28,
    marginTop: 25,
    marginLeft: 29,
  },
  textInput: {
    color: "#121212",
    height: 45,
    width: 317,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 29,
  },
  todosLosHoteles: {
    color: "#121212",
  },
  ordenar: {
    color: "rgba(132,132,132,1)",
    marginLeft: 124,
  },
  todosLosHotelesRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 29,
    marginRight: 29,
  },
  scrollArea: {
    width: 375,
    height: 451,
    marginTop: 18,
  },
  scrollArea_contentContainerStyle: {
    height: 526,
    width: 375,
  },
  cardHotel: {
    width: 317,
    height: 92,
    alignSelf: "center",
  },
  cardHotel1: {
    width: 317,
    height: 92,
    marginTop: 6,
    alignSelf: "center",
  },
  cardHotel2: {
    width: 317,
    height: 92,
    marginTop: 6,
    alignSelf: "center",
  },
  cardHotel3: {
    width: 317,
    height: 92,
    marginTop: 6,
    alignSelf: "center",
  },
  cardHotel4: {
    width: 317,
    height: 92,
    marginTop: 6,
    alignSelf: "center",
  },
  barMenu1: {
    width: 272,
    height: 43,
    marginTop: 1,
    marginLeft: 50,
  },
});

export default SearchRestaurants;
