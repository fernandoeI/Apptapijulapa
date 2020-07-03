import React, { Component } from "react";
import Svg, { Ellipse } from "react-native-svg";
import MapView from "react-native-maps";

export default function LocationCard(props) {
  const { location, name, height, top } = props;
  return (
    <MapView
      style={{ height: height, width: "100%", top: top, marginBottom: 50 }}
      initialRegion={location}
    ></MapView>
  );
}
