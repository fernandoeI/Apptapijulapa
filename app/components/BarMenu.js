import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IoniconsIcon from "react-native-vector-icons/Ionicons";

function BarMenu(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.iconStackRow}>
        <View style={styles.iconStack}>
          <EntypoIcon name="home" style={styles.icon}></EntypoIcon>
          <TouchableOpacity style={styles.button}></TouchableOpacity>
        </View>
        <View style={styles.icon2Stack}>
          <IoniconsIcon name="md-heart" style={styles.icon2}></IoniconsIcon>
          <TouchableOpacity style={styles.button1}></TouchableOpacity>
        </View>
        <View style={styles.icon3Stack}>
          <IoniconsIcon name="md-person" style={styles.icon3}></IoniconsIcon>
          <TouchableOpacity style={styles.button2}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  icon: {
    top: 4,
    left: 11,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  button: {
    top: 0,
    left: 0,
    width: 52,
    height: 41,
    position: "absolute"
  },
  iconStack: {
    width: 52,
    height: 41,
    marginTop: 1
  },
  icon2: {
    top: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 30,
    left: 13
  },
  button1: {
    top: 0,
    width: 52,
    height: 41,
    position: "absolute",
    left: 0
  },
  icon2Stack: {
    width: 52,
    height: 41,
    marginLeft: 60,
    marginTop: 1
  },
  icon3: {
    top: 5,
    left: 15,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 30
  },
  button2: {
    top: 0,
    width: 52,
    height: 41,
    position: "absolute",
    left: 0
  },
  icon3Stack: {
    width: 52,
    height: 41,
    marginLeft: 56
  },
  iconStackRow: {
    height: 42,
    flexDirection: "row",
    flex: 1
  }
});

export default BarMenu;
