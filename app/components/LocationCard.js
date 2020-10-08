import React, { Component } from "react";
import Svg, { Ellipse } from "react-native-svg";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";

export default function LocationCard(props) {
  const { location, name, height, top } = props;
  const openAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };
  return (
    <MapView
      style={{ height: height, width: "100%", top: top, marginBottom: 50 }}
      initialRegion={location}
      onPress={openAppMap}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
    </MapView>
  );
}
