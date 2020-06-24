import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddPlaceForm from "../../components/places/AddPlaceForm";

export default function AddPlaces(props) {
  const { route, navigation } = props;
  const { setIsReloadPlace } = route.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddPlaceForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        setIsReloadPlace={setIsReloadPlace}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Creando Lugar" />
    </View>
  );
}
