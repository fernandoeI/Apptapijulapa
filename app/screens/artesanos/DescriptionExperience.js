import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import { Rating, Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import CameraRollGallery from "react-native-camera-roll-gallery";

import Loading from "../../components/Loading";
import ListReview from "../../components/artesanos/ListReview";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

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
        type: "artesania",
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

  function ReadMore(props) {
    const { experience } = props;
    const [textShown, setTextShown] = useState(false); //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => {
      //To toggle the show text or hide it
      setTextShown(!textShown);
    };

    const onTextLayout = useCallback((e) => {
      setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
      // console.log(e.nativeEvent);
    }, []);

    return (
      <View>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 3}
          style={{ lineHeight: 18, textAlign: "justify" }}
        >
          {experience.description}
        </Text>

        {lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{
              lineHeight: 15,
              marginTop: 10,
              fontWeight: "bold",
              color: "#3b3a3d",
              textAlign: "right",
            }}
          >
            {textShown ? "Leer menos" : "Leer más"}
          </Text>
        ) : null}
      </View>
    );
  }

  if (!experience) return <Loading isVisible={true} text="Cargando..." />;
  return (
    <View style={{ backgroundColor: "#f2f2f2" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExperiencePresentation
          experience={experience}
          navigation={navigation}
          isFavorite={isFavorite}
          addFavorites={addFavorites}
          removeFavorites={removeFavorites}
        />

        <RatingExperience rating={rating} experience={experience} />
        <View style={styles.description}>
          <ReadMore experience={experience} />
        </View>

        <Text style={styles.subtitles}>Información básica</Text>
        <Informacion experience={experience} />
        <Text style={styles.subtitles}>Galeria</Text>
        <Galeria experience={experience} />
        <Text style={styles.subtitles}>Contacto</Text>
        <Contacto experience={experience} />
        <Text style={styles.subtitles}>Comentarios</Text>
        <ListReview navigation={navigation} idArtesano={experience.id} />
        <Toast ref={toastRef} position="center" opacity={0.9} />
        <Text style={styles.subtitles}>Ubicación</Text>
        <LocationExperience experience={experience} />
      </ScrollView>
    </View>
  );
}

function RatingExperience(props) {
  const { rating, experience } = props;
  return (
    <View>
      <Text style={styles.name}>{experience.name}</Text>
      <Text style={styles.area}>{experience.area}</Text>
      <Rating
        type="custom"
        imageSize={16}
        readonly
        startingValue={parseFloat(rating)}
        ratingBackgroundColor="#fff"
        tintColor="#f2f2f2"
        style={{ position: "absolute", top: 15, right: 15 }}
      />
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
    <View style={styles.viewImagePrincipal}>
      <CameraRollGallery
        enableCameraRoll={false}
        imageMargin={0}
        backgroundColor="#f2f2f2"
        onGetData={(fetchParams, resolve) => {
          resolve({
            assets: [
              {
                uri: experience.image[0],
              },
            ],
            pageInfo: {
              hasNextPage: false,
            },
          });
        }}
        enableModal={true}
        imageContainerStyle={styles.image}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.goBack}
      >
        <EntypoIcon
          name="chevron-small-left"
          style={styles.iconBack}
        />
      </TouchableOpacity>
      <View style={styles.iconStack}>

        <Icon
          type="material-community"
          name={isFavorite ? "heart" : "heart-outline"}
          color={isFavorite ? "#c21d17" : "#B9B9B9"}
          size={36}
          underlayColor="transparent"
          onPress={isFavorite ? removeFavorites : addFavorites}
        />
      </View>
    </View>
  );
}

function Galeria(props) {
  const { experience } = props;
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.viewGalleryScroll}>
        <CameraRollGallery
          enableCameraRoll={false}
          imageMargin={0}
          backgroundColor="#f2f2f2"
          onGetData={(fetchParams, resolve) => {
            resolve({
              assets: [
                {
                  uri: experience.image[0],
                },
                {
                  uri: experience.image[1],
                },
                {
                  uri: experience.image[2],
                },
              ],
              pageInfo: {
                hasNextPage: false,
              },
            });
          }}
          enableModal={true}
          imageContainerStyle={styles.image2}
        />
      </View>
    </ScrollView>
  );
}

function Informacion(props) {
  const { experience } = props;
  return (
    <View style={styles.scrollArea}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.basicInformationRow}>
          <BasicInformation title="Abierto de" data={experience.days} pic={2} />
          <BasicInformation
            title="Horario"
            data={
              experience.open
                ? experience.open + " - " + experience.close
                : "No mostrada"
            }
            pic={3}
          />
          <BasicInformation
            title="Desde"
            data={
              experience.price == null || experience.price == 0
                ? "Gratis"
                : "$ " + experience.price
            }
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
      top={15}
    />
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    marginLeft: 22,
    marginTop: 10,
  },

  basicInformationRow: {
    flexDirection: "row",
  },

  name: {
    marginTop: 15,
    color: "#000",
    fontSize: 18,
    marginLeft: 20,
    width: "60%",
    fontWeight: "bold",
  },
  area: {
    fontSize: 14,
    marginLeft: 20,
    marginTop: 10,
    width: "60%",
    fontWeight: "bold",
    color: "#6d6d6d",
  },

  iconStack: {
    position: "absolute",
    top: 35,
    right: 15,
  },

  image: {
    top: 0,
    left: 0,
    width: widthScreen,
    height: heightScreen * 0.45,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },

  groupIconBack: {
    width: 49,
    height: 49,
    marginTop: 35,
    marginLeft: 10,
  },
  iconBack: {
    position: "absolute",
    color: "#fff",
    fontSize: 40,
  },
  goBack: {
    width: 49,
    height: 49,
    position: "absolute",
    top: 35,
    left: 15,
    borderRadius: 100,
  },

  viewImagePrincipal: {
    width: widthScreen,
    height: heightScreen * 0.45,
    backgroundColor: "#000",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  description: {
    marginTop: 10,
    marginLeft: 22,
    marginRight: 15,
  },
  subtitles: {
    color: "#5a5a5a",
    marginLeft: 22,
    marginTop: 15,
    fontWeight: "bold",
  },
  galeria: {
    color: "rgba(0,0,0,1)",
    marginLeft: 22,
  },
  viewGalleryScroll: {
    marginTop: 10,
    marginLeft: 22,
  },

  image2: {
    width: 101,
    height: 101,
    borderWidth: 1,
    marginRight: 15,
    resizeMode: "cover",
    borderRadius: 15,
    borderColor: "#F2F2F2",
  },

  viewGallery: {
    height: 101,
    flexDirection: "row",
    flex: 1,
  },
  viewIcons: {
    flexDirection: "row",
    marginTop: 10,
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
});
