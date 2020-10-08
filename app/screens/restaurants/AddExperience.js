import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddExperienceForm from "../../components/restaurants/AddExperienceForm";

export default function AddExperience(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddExperienceForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        id={id}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Actualizando datos" />
    </View>
  );
}
