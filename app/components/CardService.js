import { concat } from "lodash";
import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

function CardService(props) {
  var icon;

  switch (props.icon) {
    case "artesanias":
      icon = require("../../assets/images/artesanias.png");
      break;
    case "gastronomia":
      icon = require("../../assets/images/gastronomia.png");
      break;
    case "hoteles":
      icon = require("../../assets/images/hoteles.png");
      break;
    case "guias":
      icon = require("../../assets/images/guias.png");
      break;
    case "tours":
      icon = require("../../assets/images/tours.png");
      break;
    case "otros":
      icon = require("../../assets/images/otros.png");
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.ellipseStack}>
        <Svg viewBox="0 0 52.36 52.36" style={styles.ellipse}>
          <Ellipse
            strokeWidth={0}
            cx={26}
            cy={26}
            rx={26}
            ry={26}
            fill="rgba(250,250,250,1)"
          ></Ellipse>
        </Svg>
        <Image source={icon} style={styles.icon}></Image>
      </View>
      <Text style={styles.restaurantes}>
        {props.restaurantes || "Restaurantes"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    paddingBottom: 20,
    paddingTop: 12,
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 52,
    height: 52,
    position: "absolute",
  },
  icon: {
    top: 9,
    left: 9,
    position: "absolute",
    height: 35,
    width: 35,
  },
  ellipseStack: {
    width: 52,
    height: 52,
    marginTop: 6,
    marginLeft: 15,
  },
  restaurantes: {
    color: "#121212",
    marginTop: 3,
    marginLeft: 23,
  },
});

export default CardService;
