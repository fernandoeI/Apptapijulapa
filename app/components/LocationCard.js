import React, { Component } from "react";
import MapView from "react-native-maps";
import openMap from "react-native-open-maps";
import { Platform } from "react-native";

export default function LocationCard(props) {
  const { location, name, height, top } = props;
  const openAppMap = () => {
    const datosCoords = Platform.select({
      ios: {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 19,
      },
      android: {
        query: `${String(location.latitude)},${String(location.longitude)}`,
        zoom: 19,
      },
    });
    openMap(datosCoords);
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
