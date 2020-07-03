import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Modal from "../Modal";
import uuid from "uuid/v4";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddExperienceForm(props) {
  const { toastRef, setIsLoading, navigation, setIsReloadExperience } = props;
  const [imageSelected, setImageSelected] = useState([]);
  const [experienceName, setExperienceName] = useState("");
  const [experienceAddress, setExperienceAddress] = useState("");
  const [experienceDescription, setExperienceDescription] = useState("");
  const [experienceSchedule, setExperienceSchedule] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationExperience, setLocationExperience] = useState(null);

  const addExperience = () => {
    if (
      !experienceName ||
      !experienceSchedule ||
      !experienceDescription ||
      !experienceAddress
    ) {
      toastRef.current.show("Todos los campos del formulario son obligarotios"),
        3000;
    } else if (imageSelected.length === 0) {
      toastRef.current.show("La experiencia debe tener al menos una foto"),
        3000;
    } else if (!locationExperience) {
      toastRef.current.show("Tienes que ubicar la experiencia en el mapa"),
        3000;
    } else {
      setIsLoading(true);
      uploadImageStorage(imageSelected).then(arrayImages =>
        db
          .collection("experiences")
          .add({
            name: experienceName,
            address: experienceAddress,
            description: experienceDescription,
            location: locationExperience,
            schedule: experienceSchedule,
            image: arrayImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: firebase.auth().currentUser.uid
          })
          .then(() => {
            setIsLoading(false);
            setIsReloadExperience(true);
            navigation.navigate("Places");
          })
          .catch(error => {
            setIsLoading(false);
            toastRef.current.show("Error al subir el lugar. Intente más tarde");
          })
      );
    }
  };

  const uploadImageStorage = async imageArray => {
    const imagesBlob = [];
    await Promise.all(
      imageArray.map(async image => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase
          .storage()
          .ref("place-image")
          .child(uuid());
        await ref.put(blob).then(result => {
          imagesBlob.push(result.metadata.name);
        });
      })
    );
    return imagesBlob;
  };

  return (
    <ScrollView>
      <ImagePlace imagePlace={imageSelected[0]} />
      <FormAdd
        setExperienceName={setExperienceName}
        setExperienceAddress={setExperienceAddress}
        setExperienceDescription={setExperienceDescription}
        setExperienceSchedule={setExperienceSchedule}
        setIsVisibleMap={setIsVisibleMap}
        locationExperience={locationExperience}
      />
      <UploadImagen
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        toastRef={toastRef}
      />

      <Button
        title="Crear lugar"
        onPress={addPlace}
        buttonStyle={styles.btnAddPlace}
      />

      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationExperience={setLocationExperience}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImagePlace(props) {
  const { imagePlace } = props;
  return (
    <View style={styles.viewPhoto}>
      {imagePlace ? (
        <Image
          source={{ uri: imagePlace }}
          style={{ width: widthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/noimage.jpg")}
          style={{ width: widthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImagen(props) {
  const { imageSelected, setImageSelected, toastRef } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionsCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionsCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir a ajustes y activarlos manualmente",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galeria sin seleccionar ninguna imagen",
          2000
        );
      } else {
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  const removeImage = image => {
    const arrayImages = imageSelected;

    Alert.alert(
      "Eliminar Imagen",
      "¿Está seguro que desea eliminar la imagén?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImageSelected(arrayImages.filter(imageUrl => imageUrl !== image))
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {imageSelected.length < 3 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {imageSelected.map(imagePlace => (
        <Avatar
          key={imagePlace}
          onPress={() => removeImage(imagePlace)}
          style={styles.miniatureStyle}
          source={{ uri: imagePlace }}
        />
      ))}
    </View>
  );
}

function FormAdd(props) {
  const {
    setExperienceAddress,
    setExperienceDescription,
    setExperienceName,
    setExperienceSchedule,
    setIsVisibleMap,
    locationExperience
  } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del Lugar"
        containerStyle={styles.input}
        onChange={e => setExperienceName(e.nativeEvent.text)}
      />

      <Input
        placeholder="Descripción del lugar"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={e => setExperienceDescription(e.nativeEvent.text)}
      />

      <Input
        placeholder="Horario"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={e => setExperienceSchedule(e.nativeEvent.text)}
      />

      <Input
        placeholder="Ubicación"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationExperience ? "rgb(34, 21, 81 )" : "#e3e3e3",
          onPress: () => setIsVisibleMap(true)
        }}
        onChange={e => setExperienceAddress(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationExperience,
    toastRef
  } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;

      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localización",
          3000
        );
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          longitudeDelta: 0.001,
          latitudeDelta: 0.001
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationExperience(location);
    toastRef.current.show("Localización guardada correctamente");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar ubicación"
            onPress={confirmLocation}
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
          />

          <Button
            title="Cancelar ubicación"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 100,
    width: 100,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  mapStyle: {
    width: "100%",
    height: 550
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnSave: {
    backgroundColor: "rgb(34, 21, 81 )"
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d"
  },
  btnAddPlace: {
    backgroundColor: "rgb(34, 21, 81 )",
    margin: 20
  }
});
