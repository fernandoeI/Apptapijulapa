import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

function BasicInformation(props) {
  const { title, data, pic } = props;

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.button}>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 41.51 41.51" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(250,250,250,1)"
              cx={21}
              cy={21}
              rx={21}
              ry={21}
            ></Ellipse>
          </Svg>
          {pic === 1 ? (
            <Image
              source={require("../../assets/images/icons8-calendario-40.png")}
              resizeMode="contain"
              style={styles.image2}
            />
          ) : null}
          {pic === 2 ? (
            <Image
              source={require("../../assets/images/icons8-domingo-80.png")}
              resizeMode="contain"
              style={styles.image2}
            />
          ) : null}
          {pic === 3 ? (
            <Image
              source={require("../../assets/images/icons8-reloj-128.png")}
              resizeMode="contain"
              style={styles.image2}
            />
          ) : null}
          {pic === 4 ? (
            <Image
              source={require("../../assets/images/icons8-dinero-100.png")}
              resizeMode="contain"
              style={styles.image2}
            />
          ) : null}
        </View>
        <Text style={styles.mejoresMeses}>{title}</Text>
        <Text style={styles.junAgo}>{data}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  button: {
    marginTop: 30,
    width: 112,
    height: "120%",
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    alignSelf: "center",
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 42,
    height: 42,
    position: "absolute",
  },
  image2: {
    top: 8,
    left: 8,
    width: 26,
    height: 26,
    position: "absolute",
  },
  ellipseStack: {
    width: 42,
    height: 42,
    marginTop: 5,
    marginLeft: 10,
  },
  mejoresMeses: {
    color: "rgba(132,132,132,1)",
    fontSize: 12,
    marginTop: 38,
    marginLeft: 10,
  },
  junAgo: {
    color: "#121212",
    marginTop: 10,
    marginLeft: 10,
  },
});

export default BasicInformation;
