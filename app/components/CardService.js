import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";

function CardService(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect2}>
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
          <Icon name={props.icon || "md-restaurant"} style={styles.icon}></Icon>
        </View>
        <Text style={styles.restaurantes}>
          {props.restaurantes || "Restaurantes"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect2: {
    width: 138,
    height: 89,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 52,
    height: 52,
    position: "absolute",
  },
  icon: {
    top: 4,
    left: 10,
    position: "absolute",
    color: "rgba(32,14,50,1)",
    fontSize: 40,
    height: 43,
    width: 34,
  },
  ellipseStack: {
    width: 52,
    height: 52,
    marginTop: 6,
    marginLeft: 7,
  },
  restaurantes: {
    color: "#121212",
    height: 18,
    width: 101,
    marginTop: 3,
    marginLeft: 18,
  },
});

export default CardService;
