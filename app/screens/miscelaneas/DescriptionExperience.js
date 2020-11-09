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
  Image,
  Linking,
} from "react-native";
import { Rating, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import ImageModal from "react-native-image-modal";
import Loading from "../../components/Loading";
import ListReview from "../../components/miscelaneas/ListReview";

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
  const [experience, setExperience] = useState(null);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("users")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data();
          data.id = response.id;
          setExperience(data);
          setRating(data.rating);
        });
    }, [])
  );

  useEffect(() => {
    if (userLogged && experience) {
      db.collection("favorites")
        .where("idFavorite", "==", experience.id)
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          if (response.docs.length === 1) {
            setIsFavorite(true);
          }
        });
    }
  }, [userLogged, experience]);

  const addFavorites = () => {
    if (!userLogged) {
      toastRef.current.show(
        "Necesitas logearte para seleccionar tus favoritos"
      );
    } else {
      const payload = {
        idUser: firebase.auth().currentUser.uid,
        idFavorite: experience.id,
        type: "miscelanea",
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
      .where("idFavorite", "==", experience.id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
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

  if (!experience) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <View style={styles.container}>
      <ExperiencePresentation
        experience={experience}
        navigation={navigation}
        isFavorite={isFavorite}
        addFavorites={addFavorites}
        removeFavorites={removeFavorites}
      />
      <View style={{ height: heightScreen * 0.6, backgroundColor: "#f2f2f2" }}>
        <ScrollView
          style={{
            height: heightScreen,
          }}
        >
          <RatingExperience rating={rating} />
          <View style={styles.loremIpsumStack}>
            <Text style={styles.loremIpsum2}>{experience.description}</Text>
          </View>
          <Text style={styles.subtitles}>Información básica</Text>
          <Informacion experience={experience} />
          <Text style={styles.subtitles}>Galeria</Text>
          <Galeria experience={experience} />
          <Text style={styles.subtitles}>Contacto</Text>
          <Contacto experience={experience} />
          <Text style={styles.subtitles}>Comentarios</Text>
          <ListReview navigation={navigation} idMiscelanea={experience.id} />
          <Toast ref={toastRef} position="center" opacity={0.9} />
          <Text style={styles.subtitles}>Ubicación</Text>
          <LocationExperience experience={experience} />
        </ScrollView>
      </View>
    </View>
  );
}

function RatingExperience(props) {
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
          ratingTextColor="red"
        />
      </View>
    </View>
  );
}

function Contacto(props) {
  const { experience } = props;
  const WHATSAPP_ID = "com.whatsapp"; //ID of app need to open in play store
  const whatsappDeepLinkURL =
    "whatsapp://send?text=Hola, me gustaría tener informes sobre &phone=52" +
    experience.whatsapp; //Most of the mobile app provide it
  const instagramDeepLinkURL =
    "http://instagram.com/_u/" + experience.instagram;

  return (
    <View style={styles.viewIcons}>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(whatsappDeepLinkURL).catch((err) => {
            Linking.openURL(`market://details?id=${WHATSAPP_ID}`).catch((err) =>
              Linking.openURL(
                `http://play.google.com/store/apps/details?id=${WHATSAPP_ID}`
              ).catch((err) => console.error("An error occurred", err))
            );
          });
        }}
      >
        <Image
          source={require("../../../assets/images/icons8-whatsapp-80.png")}
          resizeMode="contain"
          style={styles.icon3}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.facebook.com/" + experience.facebook)
        }
      >
        <Image
          source={require("../../../assets/images/icons8-facebook-rodeado-de-círculo-80.png")}
          resizeMode="contain"
          style={styles.icon3}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Linking.openURL(instagramDeepLinkURL)}>
        <Image
          source={require("../../../assets/images/icons8-instagram-160.png")}
          resizeMode="contain"
          style={styles.icon3}
        />
      </TouchableOpacity>
    </View>
  );
}

function ExperiencePresentation(props) {
  const {
    experience,
    navigation,
    isFavorite,
    addFavorites,
    removeFavorites,
  } = props;
  return (
    <View style={styles.rectStack}>
      <ImageBackground
        source={{ uri: experience.image[0] }}
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
      <Text style={styles.lugares}>MISCELANEAS</Text>
      <View style={styles.exCoventoOxolotanRow}>
        <Text style={styles.exCoventoOxolotan}>
          {experience.name}, {experience.area}
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
  const { experience } = props;
  return (
    <View style={styles.scrollArea2}>
      <FlatList
        data={experience.image}
        horizontal={true}
        renderItem={(experiences) => (
          <ImageGallery imageGallery={experiences} />
        )}
      />
    </View>
  );
}

function ImageGallery(props) {
  const { imageGallery } = props;
  const imageExperience = imageGallery.item;

  return (
    <View style={styles.image2Row}>
      <ImageModal
        isTranslucent={Platform.OS === "android" ? true : false}
        swipeToDismiss={false}
        imageBackgroundColor="#F2F2F2"
        resizeMode="contain"
        style={styles.image2}
        source={imageExperience ? { uri: imageExperience } : null}
      />
    </View>
  );
}

function Informacion(props) {
  const { experience } = props;
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
            title="Abierto de"
            data={experience.days}
            style={styles.basicInformation}
            pic={2}
          />
          <BasicInformation
            title="Horario"
            data={
              experience.open
                ? experience.open + " - " + experience.close
                : "No mostrada"
            }
            style={styles.basicInformation}
            pic={3}
          />
          <BasicInformation
            title="Desde"
            data={
              experience.price == null || experience.price == 0
                ? "Gratis"
                : "$ " + experience.price
            }
            style={styles.basicInformation}
            pic={4}
          />
        </View>
      </ScrollView>
    </View>
  );
}
function LocationExperience(props) {
  const { experience } = props;
  return (
    <LocationCard
      name={experience.name}
      location={experience.location}
      height={200}
      top={10}
    />
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
    overflow: "hidden",
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
  viewIcons: {
    flexDirection: "row",
    marginTop: 10,
    width: widthScreen,
    marginLeft: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon3: {
    width: 50,
    height: 50,
    marginRight: 40,
  },
  rating: {
    position: "absolute",
    right: 15,
    marginTop: 15,
  },
});
