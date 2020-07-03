import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";

import ImageModal from "react-native-image-modal";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

import Svg, { Path } from "react-native-svg";
import BasicInformation from "../components/BasicInformation";
import LocationCard from "../components/LocationCard";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";

const db = firebase.firestore(firebaseApp);

export default function Description(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [place, setPlace] = useState(null);

  useEffect(() => {
    db.collection("places")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setPlace(data);
      });
  }, []);

  if (!place) return <Loading isVisible={true} text="Cargando..." />;
  return (
    <View style={styles.container}>
      <PlacePresentation place={place} navigation={navigation} />
      <View style={{ height: 450 }}>
        <ScrollView
          style={{
            top: -25,
            height: 600,
          }}
        >
          <Text style={styles.subtitles}>Acerca de</Text>
          <View style={styles.loremIpsumStack}>
            <Text style={styles.loremIpsum2}>{place.description}</Text>
          </View>
          <Text style={styles.subtitles}>Información básica</Text>
          <Informacion place={place} />
          <Text style={styles.subtitles}>Galeria</Text>
          <Galeria place={place} />
          <Text style={styles.subtitles}>Ubicación</Text>
          <LocationPlace place={place} />
        </ScrollView>
      </View>
    </View>
  );
}

function PlacePresentation(props) {
  const { place, navigation } = props;
  return (
    <View style={styles.rectStack}>
      <View style={styles.rect}>
        <Text style={styles.lugares}>LUGARES</Text>
        <View style={styles.exCoventoOxolotanRow}>
          <Text style={styles.exCoventoOxolotan}>
            {place.name}, {place.area}
          </Text>
          <View style={styles.iconStack}>
            <IoniconsIcon
              name="ios-heart-empty"
              style={styles.icon}
            ></IoniconsIcon>
            <TouchableOpacity style={styles.button2}></TouchableOpacity>
          </View>
        </View>
      </View>
      <ImageBackground
        source={{ uri: place.image[0] }}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <View style={styles.group1}>
          <View style={styles.icon1Stack}>
            <EntypoIcon
              name="chevron-small-left"
              style={styles.icon1}
            ></EntypoIcon>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.button3}
            ></TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.rect2}></View>
    </View>
  );
}

function Galeria(props) {
  const { place } = props;
  return (
    <View style={styles.scrollArea2}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollArea2_contentContainerStyle}
      >
        <View style={styles.image2Row}>
          <ImageModal
            isTranslucent={Platform.OS === "android" ? true : false}
            swipeToDismiss={false}
            imageBackgroundColor="#FAFAFA"
            resizeMode="contain"
            style={styles.image2}
            source={{
              uri: place.image[0],
            }}
          />
          <ImageModal
            isTranslucent={Platform.OS === "android" ? true : false}
            swipeToDismiss={false}
            imageBackgroundColor="#FAFAFA"
            resizeMode="contain"
            style={styles.image2}
            source={{
              uri: place.image[1],
            }}
          />
          <ImageModal
            isTranslucent={Platform.OS === "android" ? true : false}
            swipeToDismiss={false}
            imageBackgroundColor="#FAFAFA"
            resizeMode="contain"
            style={styles.image2}
            source={{
              uri: place.image[2],
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Informacion(props) {
  const { place } = props;
  return (
    <View style={styles.scrollArea}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollArea_contentContainerStyle}
        showsHorizontalScrollIndicator={false}
      >
        <Svg viewBox="0 0 68.91 19.8" style={styles.path}>
          <Path
            strokeWidth="0"
            stroke="grey"
            fill="rgba(230, 230, 230,1)"
            type="path"
            d="M0.00 0.00 L68.91 19.80 L0.00 0.00 Z"
          ></Path>
        </Svg>
        <View style={styles.basicInformationRow}>
          <BasicInformation
            style={styles.basicInformation}
            title="Mejores Meses"
            data={place.bestMonths}
            pic={1}
          ></BasicInformation>
          <BasicInformation
            title="Abierto de"
            data={place.days}
            style={styles.basicInformation}
            pic={2}
          ></BasicInformation>
          <BasicInformation
            title="Horario"
            data={place.hour}
            style={styles.basicInformation}
            pic={3}
          ></BasicInformation>
        </View>
      </ScrollView>
    </View>
  );
}

function LocationPlace(props) {
  const { place } = props;
  return (
    <LocationCard
      style={styles.locationCard}
      name={place.name}
      location={place.location}
      height={200}
      top={10}
    ></LocationCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250,250,250,1)",
  },
  scrollArea: {
    width: 353,
    height: 140,
    marginLeft: 22,
    marginTop: 10,
  },
  scrollArea_contentContainerStyle: {
    width: 430,
    flexDirection: "row",
  },
  path: {
    width: 69,
    height: 20,
    marginLeft: 2041,
    marginTop: 1937,
  },
  basicInformation: {
    width: 112,
    height: 147,
    marginRight: 24,
  },

  locationCard: {
    height: 147,
    width: 112,
    marginLeft: 24,
  },
  basicInformationRow: {
    height: 147,
    flexDirection: "row",
    flex: 1,
    marginRight: -167,
    marginLeft: -2110,
    marginTop: 2,
  },
  rect: {
    top: 26,
    left: 0,
    width: 360,
    height: 240,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  lugares: {
    color: "rgba(255,255,255,1)",
    letterSpacing: 2,
    fontSize: 12,
    marginTop: 151,
    marginLeft: 22,
  },
  exCoventoOxolotan: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 6,
  },
  icon: {
    top: 0,
    left: 2,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 43,
    width: 33,
  },
  button2: {
    top: 0,
    left: 0,
    width: 40,
    height: 43,
    position: "absolute",
  },
  iconStack: {
    width: 40,
    height: 43,
    position: "absolute",
    top: 5,
    left: 280,
  },
  exCoventoOxolotanRow: {
    height: 43,
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 22,
    marginRight: 16,
  },
  image: {
    top: 0,
    left: 0,
    width: 360,
    height: 266,
    position: "absolute",
  },
  image_imageStyle: {
    opacity: 0.4,
  },
  group1: {
    width: 49,
    height: 49,
    marginTop: 45,
    marginLeft: 10,
  },
  icon1: {
    top: 3,
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button3: {
    top: 0,
    left: 0,
    width: 49,
    height: 49,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,1)",
    opacity: 0.2,
  },
  icon1Stack: {
    width: 49,
    height: 49,
  },
  rect2: {
    top: 256,
    left: 0,
    width: 360,
    height: 10,
    position: "absolute",
    backgroundColor: "rgba(250,250,250,1)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  rectStack: {
    width: 360,
    height: 291,
  },

  loremIpsum2: {
    top: 0,
    left: 0,
    position: "absolute",
    color: "#121212",
    textAlign: "justify",
  },
  loremIpsumStack: {
    width: 320,
    height: 50,
    marginTop: 5,
    marginLeft: 22,
  },
  subtitles: {
    color: "rgba(0,0,0,1)",
    marginLeft: 22,
    marginTop: 15,
  },
  galeria: {
    color: "rgba(0,0,0,1)",
    marginLeft: 22,
  },
  scrollArea2: {
    width: 353,
    height: 101,
    backgroundColor: "#FAFAFA",
    marginTop: 10,
    marginLeft: 22,
  },
  scrollArea2_contentContainerStyle: {
    width: 400,
    height: 101,
    flexDirection: "row",
  },
  image2: {
    width: 101,
    height: 101,
    borderWidth: 1,
    marginRight: 15,
    resizeMode: "cover",
    borderRadius: 15,
  },

  image2Row: {
    height: 101,
    flexDirection: "row",
    flex: 1,
  },
});
