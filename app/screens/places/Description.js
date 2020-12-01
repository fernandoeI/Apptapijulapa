import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
  Modal,
  TouchableHighlight
} from "react-native";
import { Rating, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import ImageModal from "react-native-image-modal";
import Loading from "../../components/Loading";
import ListReview from "../../components/places/ListReview";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

import Svg, { Path } from "react-native-svg";
import BasicInformation from "../../components/BasicInformation";
import LocationCard from "../../components/LocationCard";
import EntypoIcon from "react-native-vector-icons/Entypo";

const db = firebase.firestore(firebaseApp);
const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

export default function Description(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [place, setPlace] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  var user = firebase.auth().currentUser;
  var uid;
  if (user) {
    uid = user.uid;
  } else {
    uid = 0;
  }

  useFocusEffect(
    useCallback(() => {
      db.collection("places")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setPlace(data);
          setRating(data.rating);
        });
    }, [])
  );

  useEffect(() => {
    if (userLogged && place) {
      db.collection("favorites")
        .where("idFavorite", "==", place.id)
        .where("idUser", "==", uid)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, [userLogged, place]);

  const addFavorites = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Necesitas logearte para seleccionar tus favoritos"
      );
    } else {
      const payload = {
        idUser: uid,
        idFavorite: place.id,
        type: "place",
      };
      db.collection("favorites")
        .add(payload)
        .then(() => {
          setIsFavorite(true);
          toastRef.current.show("Añadido a favoritos");
        })
        .catch(() => {
          toastRef.current.show("Error al añadir el restaurante a favoritos");
        });
    }
  };
  const removeFavorites = () => {
    db.collection("favorites")
      .where("idFavorite", "==", place.id)
      .where("idUser", "==", uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsFavorite(false);
              toastRef.current.show("Eliminado de la lista de favoritos");
            })
            .catch(() => {
              toastRef.current.show("Error al eliminar de favoritos");
            });
        });
      });
  };

  if (!place) return <Loading isVisible={true} text="Cargando..." />;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style={styles.modalText}>{place.description}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "rgb(34, 21, 81)" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <PlacePresentation
        place={place}
        navigation={navigation}
        isFavorite={isFavorite}
        addFavorites={addFavorites}
        removeFavorites={removeFavorites}
      />
      <View style={{ height: heightScreen * 0.6, backgroundColor: "#f2f2f2" }}>
        <ScrollView
          style={{
            height: heightScreen * 0.8,
          }}
        >
          <RatingPlace rating={rating} />
          <View style={styles.loremIpsumStack}>
            <Text style={styles.loremIpsum2} numberOfLines={3}> {place.description}</Text>
            <Text style={{position: "absolute", top: 55, right: 0, fontWeight:"bold" }} onPress={() => {
                setModalVisible(!modalVisible);
              }}>Leer más</Text>
          </View>
          
          <Text style={styles.subtitles}>Información básica</Text>
          <Informacion place={place} />
          <Text style={styles.subtitles}>Galeria</Text>
          <Galeria place={place} />
          <Text style={styles.subtitles}>Comentarios</Text>
          <ListReview navigation={navigation} idPlace={place.id} />
          <Toast ref={toastRef} position="center" opacity={0.9} />
          <Text style={styles.subtitles}>Ubicación</Text>
          <LocationPlace place={place} />
        </ScrollView>
      </View>
    </View>
  );
}

function RatingPlace(props) {
  const { rating } = props;
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.subtitles}>Acerca de</Text>
        <Rating
          type="custom"
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
          ratingBackgroundColor="#fff"
          tintColor="#f2f2f2"
        />
      </View>
    </View>
  );
}

function PlacePresentation(props) {
  const {
    place,
    navigation,
    isFavorite,
    addFavorites,
    removeFavorites,
  } = props;
  return (
    <View style={styles.rectStack}>
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
      <Text style={styles.lugares}>SITIOS DE INTERÉS</Text>
      <View style={styles.exCoventoOxolotanRow}>
        <Text style={styles.exCoventoOxolotan}>
          {place.name}, {place.area}
        </Text>
      </View>
      <View style={styles.iconStack}>
        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#c21d17" : "#fff"}
          size={36}
          underlayColor="transparent"
          onPress={isFavorite ? removeFavorites : addFavorites}
        />
      </View>
      <View style={styles.rect2}></View>
    </View>
  );
}

function Galeria(props) {
  const { place } = props;
  return (
    <View style={styles.scrollArea2}>
      <FlatList
        data={place.image}
        horizontal={true}
        renderItem={(places) => <ImageGallery imageGallery={places} />}
      />
    </View>
  );
}

function ImageGallery(props) {
  const { imageGallery } = props;
  const imagePlace = imageGallery.item;

  return (
    <View style={styles.image2Row}>
      <ImageModal
        isTranslucent={Platform.OS === "android" ? true : false}
        swipeToDismiss={true}
        imageBackgroundColor="#F2F2F2"
        resizeMode="contain"
        style={styles.image2}
        source={imagePlace ? { uri: imagePlace } : null}
      />
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
          />
          <BasicInformation
            title="Abierto de"
            data={place.days}
            style={styles.basicInformation}
            pic={2}
          />
          <BasicInformation
            title="Horario"
            data={place.open ? place.open + " - " + place.close : "No mostrada"}
            style={styles.basicInformation}
            pic={3}
          />
          <BasicInformation
            title="Desde"
            data={
              place.price == null || place.price == 0
                ? "Gratis"
                : " $" + place.price
            }
            style={styles.basicInformation}
            pic={4}
          />
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
    backgroundColor: "#000",
  },

  rating: {
    position: "absolute",
    right: 15,
    marginTop: 15,
  },

  scrollArea: {
    width: widthScreen,
    height: 147,
    marginLeft: 22,
    marginTop: 10,
  },
  scrollArea_contentContainerStyle: {
    width: widthScreen * 1.5,
    flexDirection: "row",
  },
  path: {
    width: 69,
    height: 20,
    marginLeft: 2041,
    marginTop: 1937,
  },
  basicInformation: {
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

    marginBottom: 15,
  },
  rect: {
    top: 30,
    left: 0,
    width: 360,
    height: 240,
    position: "absolute",
  },
  lugares: {
    color: "rgb(255,255,255)",
    letterSpacing: 2,
    fontSize: 12,
    marginTop: heightScreen * 0.32,
    marginLeft: 22,
  },
  exCoventoOxolotan: {
    color: "#FFF",
    fontSize: 20,
  },
  icon: {
    top: 0,
    left: 2,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 40,
  },
  button2: {
    top: 0,
    left: 0,
    width: 40,
    height: 43,
  },
  iconStack: {
    position: "absolute",
    top: "80%",
    right: "5%",
  },
  exCoventoOxolotanRow: {
    height: "20%",
    flexDirection: "row",
    marginLeft: 22,
    marginRight: 16,
    width: "80%"
  },
  image: {
    top: 0,
    left: 0,
    width: widthScreen,
    height: heightScreen * 0.4,
    position: "absolute",
  },
  image_imageStyle: {
    opacity: 0.5,
  },
  group1: {
    width: 49,
    height: 49,
    marginTop: 35,
    marginLeft: 20,
  
  },
  icon1: {
    top: 3,
    left: 3,
    position: "absolute",
    color: "#fff",
    fontSize: 40,
  },
  button3: {
    width: 49,
    height: 49,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgb(255,255,255)",
    opacity:0.3
  },
  icon1Stack: {
    width: 49,
    height: 49,
  },
  rect2: {
    top: "96%",
    left: 0,
    width: widthScreen,
    height: 20,
    position: "absolute",
    backgroundColor: "#F2F2F2",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  rectStack: {
    width: widthScreen,
    height: heightScreen * 0.4,
  },

  loremIpsum2: {
    position: "absolute",
    color: "#121212",
    textAlign: "justify",
    
  },
  loremIpsumStack: {
    width: widthScreen * 0.9,
    height: 60,
    marginTop: 5,
    marginLeft: 22,
  },
  subtitles: {
    color: "rgba(0,0,0,1)",
    marginLeft: 22,
    marginTop: 15,
    fontWeight: "bold",
  },
  galeria: {
    color: "rgba(0,0,0,1)",
    marginLeft: 22,
  },
  scrollArea2: {
    width: 353,
    height: 101,
    backgroundColor: "#F2F2F2",
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
    borderColor: "#F2F2F2"
  },

  image2Row: {
    height: 101,
    flexDirection: "row",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
