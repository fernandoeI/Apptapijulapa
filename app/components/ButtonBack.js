import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

function ButtonBack(props) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
    ></TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6",
    borderRadius: 100,
    opacity: 0.37
  }
});

export default ButtonBack;
