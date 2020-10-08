import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Text,
} from "react-native-elements";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Modal from "../Modal";
import uuid from "uuid/v4";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

export default function AddPlaceForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [imageSelected, setImageSelected] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [bestMonths, setBestMonths] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationPlace, setLocationPlace] = useState(null);
  const [placeArea, setPlaceArea] = useState("");
  const [days, setDays] = useState("");
  const [dateOpen, setDateOpen] = useState("");
  const [dateClose, setDateClose] = useState("");
  const [price, setPrice] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleClose, setDatePickerVisibilityClose] = useState(
    false
  );

  const addPlace = () => {
    if (
      !placeName ||
      !placeArea ||
      !bestMonths ||
      !placeDescription ||
      !placeAddress ||
      !days ||
      !dateOpen ||
      !dateClose
    ) {
      toastRef.current.show("Todos los campos del formulario son obligarotios"),
        3000;
    } else if (size(imageSelected) === 0) {
      toastRef.current.show("El lugar debe tener al menos una foto"), 3000;
    } else if (!locationPlace) {
      toastRef.current.show("Tienes que ubicar el lugar en el mapa"), 3000;
    } else {
      setIsLoading(true);
      uploadImageStorage().then((response) => {
        setIsLoading(false);
        db.collection("places")
          .add({
            name: placeName,
            area: placeArea,
            description: placeDescription,
            bestMonths: bestMonths,
            days: days,
            open: dateOpen,
            close: dateClose,
            address: placeAddress,
            location: locationPlace,
            price: price,
            image: response,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: firebase.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("Mi cuenta");
          })
          .catch((error) => {
            setIsLoading(false);
            toastRef.current.show("Error al subir el lugar. Intente más tarde");
          });
      });
    }
  };

  const uploadImageStorage = async () => {
    const imagesBlob = [];

    await Promise.all(
      map(imageSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("place-image").child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`place-image/${result.metadata.name}`)
            .getDownloadURL()
            .then((photoURL) => {
              imagesBlob.push(photoURL);
            });
        });
      })
    );
    return imagesBlob;
  };

  return (
    <View style={{ height: heightScreen * 0.95, backgroundColor: "#f2f2f2" }}>
      <ImagePlace imagePlace={imageSelected[0]} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView>
          <FormAdd
            setPlaceName={setPlaceName}
            setPlaceArea={setPlaceArea}
            setPlaceDescription={setPlaceDescription}
            setBestMonths={setBestMonths}
            setDays={setDays}
            setPlaceAddress={setPlaceAddress}
            setIsVisibleMap={setIsVisibleMap}
            locationPlace={locationPlace}
            dateOpen={dateOpen}
            setDateOpen={setDateOpen}
            dateClose={dateClose}
            setDateClose={setDateClose}
            isDatePickerVisibleClose={isDatePickerVisibleClose}
            setDatePickerVisibilityClose={setDatePickerVisibilityClose}
            isDatePickerVisible={isDatePickerVisible}
            setDatePickerVisibility={setDatePickerVisibility}
            setPrice={setPrice}
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
            setLocationPlace={setLocationPlace}
            toastRef={toastRef}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function ImagePlace(props) {
  const { imagePlace } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imagePlace
            ? { uri: imagePlace }
            : require("../../../assets/img/noimage.jpg")
        }
        style={{ width: widthScreen, height: heightScreen * 0.35 }}
      />
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
        aspect: [4, 3],
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

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Está seguro que desea eliminar la imagén?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () =>
            setImageSelected(
              filter(imageSelected, (imageUrl) => imageUrl !== image)
            ),
        },
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

      {imageSelected.map((imagePlace) => (
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
    setPlaceName,
    setPlaceArea,
    setPlaceDescription,
    setBestMonths,
    setDays,
    setPlaceAddress,
    setIsVisibleMap,
    locationPlace,
    setPrice,
    isDatePickerVisible,
    setDatePickerVisibility,
    dateOpen,
    setDateOpen,
    dateClose,
    setDateClose,
    isDatePickerVisibleClose,
    setDatePickerVisibilityClose,
  } = props;

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del Lugar"
        onChange={(e) => setPlaceName(e.nativeEvent.text)}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        containerStyle={styles.input}
      />

      <RNPickerSelect
        placeholder={{ label: "  Asentamiento" }}
        items={[
          { label: "Tapijulapa", value: "Tapijulapa" },
          { label: "Oxolotán", value: "Oxolotán" },
        ]}
        onValueChange={(value) => setPlaceArea(value)}
        useNativeAndroidPickerStyle={false}
        style={{
          inputIOS: {
            marginTop: 15,
            color: "rgba(0,0,0,1)",
            width: "95%",
            height: 42,
            backgroundColor: "rgba(255,255,255,1)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,1)",
            borderRadius: 5,
          },
          inputAndroid: {
            marginTop: 15,
            color: "rgba(0,0,0,1)",
            width: "95%",
            height: 42,
            backgroundColor: "rgba(255,255,255,1)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,1)",
            fontSize: 20,
            borderRadius: 5,
          },
        }}
      />

      <Input
        placeholder="Descripción del lugar"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setPlaceDescription(e.nativeEvent.text)}
        containerStyle={styles.textAreaContainer}
      />

      <Input
        placeholder="Mejores meses"
        inputContainerStyle={styles.input}
        onChange={(e) => setBestMonths(e.nativeEvent.text)}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        containerStyle={styles.input}
      />

      <Input
        placeholder="Días abierto"
        inputContainerStyle={styles.input}
        onChange={(e) => setDays(e.nativeEvent.text)}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        containerStyle={styles.input}
      />

      {/* <Input
        placeholder="Horario"
        inputContainerStyle={styles.input}
        onChange={(e) => setHour(e.nativeEvent.text)}
      /> */}

      <Text style={styles.label}>Horario</Text>
      <View style={styles.viewClock}>
        <Input
          placeholder="00:00"
          value={dateOpen}
          containerStyle={styles.inputClock}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          rightIcon={{
            type: "material-community",
            name: "clock-outline",
            color: dateOpen ? "rgb(34, 21, 81 )" : "#e3e3e3",
            onPress: () => setDatePickerVisibility(true),
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={(date) => {
            setDatePickerVisibility(false);
            setDateOpen(
              (date.getHours() < 10
                ? "0" + date.getHours().toString()
                : date.getHours().toString()) +
                ":" +
                (date.getMinutes() < 10
                  ? "0" + date.getMinutes().toString()
                  : date.getMinutes().toString())
            );
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />

        <Input
          placeholder="23:59"
          value={dateClose}
          containerStyle={styles.inputClock}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          rightIcon={{
            type: "material-community",
            name: "clock-outline",
            color: dateClose ? "rgb(34, 21, 81 )" : "#e3e3e3",
            onPress: () => setDatePickerVisibilityClose(true),
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisibleClose}
          mode="time"
          onConfirm={(date2) => {
            setDatePickerVisibilityClose(false);
            setDateClose(
              (date2.getHours() < 10
                ? "0" + date2.getHours().toString()
                : date2.getHours().toString()) +
                ":" +
                (date2.getMinutes() < 10
                  ? "0" + date2.getMinutes().toString()
                  : date2.getMinutes().toString())
            );
          }}
          onCancel={() => setDatePickerVisibilityClose(false)}
        />
      </View>

      <Input
        placeholder="0.00"
        inputContainerStyle={styles.input}
        onChange={(e) => setPrice(e.nativeEvent.text)}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        containerStyle={styles.input}
        leftIcon={{
          type: "foundation",
          name: "dollar",
          color: "#e3e3e3",
        }}
        leftIconContainerStyle={{ marginLeft: 0 }}
        keyboardType="numeric"
      />

      <Input
        placeholder="Ubicación"
        containerStyle={styles.input}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationPlace ? "rgb(34, 21, 81 )" : "#e3e3e3",
          onPress: () => setIsVisibleMap(true),
        }}
        onChange={(e) => setPlaceAddress(e.nativeEvent.text)}
      />
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationPlace, toastRef } = props;
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
          latitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationPlace(location);
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
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
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
    marginTop: 15,
    width: "95%",
    height: 42,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 5,
  },

  label: {
    marginLeft: 13,
    fontSize: 16,
    marginTop: 5,
    color: "#9c9c9c",
  },
  label2: {
    marginLeft: "50%",
    fontSize: 16,
    marginTop: 15,
    color: "#9c9c9c",
  },
  textAreaContainer: {
    marginTop: 15,
    color: "rgba(0,0,0,1)",
    width: "95%",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
    borderBottomWidth: 0,
  },
  viewForm: {
    marginLeft: 25,
    marginRight: 10,
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 100,
    width: 100,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 250,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "rgb(34, 21, 81 )",
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },
  btnAddPlace: {
    backgroundColor: "rgb(34, 21, 81 )",
    margin: 20,
  },
  viewClock: { flexDirection: "row" },
  inputClock: {
    marginTop: 5,
    width: "45%",
    height: 42,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginRight: "5%",
  },
});
