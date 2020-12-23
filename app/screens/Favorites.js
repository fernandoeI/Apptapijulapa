import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
  const { navigation } = props;
  const [places, setPlaces] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        const idUser = firebase.auth().currentUser.uid;
        db.collection("favorites")
          .where("idUser", "==", idUser)
          .get()
          .then((response) => {
            const idPlacesArray = [];
            const type = [];
            response.forEach((doc) => {
              idPlacesArray.push(doc.data().idFavorite);
              type.push(doc.data().type);
            });
            getDataPlace(idPlacesArray, type).then((response) => {
              const places = [];
              let au = 0;
              response.forEach((doc) => {
                const place = doc.data();
                place.id = doc.id;
                place.type = type[au];
                places.push(place);
                au++;
                console.log(place);
              });
              setPlaces(places);
            });
          });
      }
      setReloadData(false);
    }, [userLogged, reloadData])
  );

  const getDataPlace = (idPlacesArray, type) => {
    const arrayPlaces = [];
    const arrayNew = [];
    let au = 0;

    type.forEach((type) => {
      arrayNew.push({ idFavorite: idPlacesArray[au], type: type });
      au++;
    });

    arrayNew.forEach((item) => {
      if (item.type === "place") {
        const result = db.collection("places").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      } else if (item.type === "experience") {
        const result = db.collection("experiences").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      } else if (item.type === "restaurant") {
        const result = db.collection("users").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      } else if (item.type === "artesania") {
        const result = db.collection("users").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      } else if (item.type === "hotel") {
        const result = db.collection("users").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      } else if (item.type === "guia") {
        const result = db.collection("users").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      } else if (item.type === "miscelanea") {
        const result = db.collection("users").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      } else if (item.type === "other") {
        const result = db.collection("users").doc(item.idFavorite).get();
        arrayPlaces.push(result);
      }
    });

    return Promise.all(arrayPlaces);
  };

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (places?.length === 0) {
    return <NotFoundFavorites />;
  }
  return (
    <View style={styles.viewBody}>
      {places ? (
        <FlatList
          data={places}
          renderItem={(place) => (
            <Place
              place={place}
              setIsLoading={setIsLoading}
              toastRef={toastRef}
              setReloadData={setReloadData}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" style={styles.loaderFavorites} />
          <Text style={{ textAlign: "center" }}>Cargando favoritos</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text="Eliminando de favoritos" isVisible={isLoading} />
    </View>
  );
}

function NotFoundFavorites() {
  return (
    <View style={styles.view}>
      <Image
        source={require("../../assets/images/undraw_empty_xct9.png")}
        style={{ width: 350, height: 350 }}
      />
      <Text style={styles.notFoundText}>Tu lista de favoritos está vacía</Text>
    </View>
  );
}

function UserNoLogged() {
  return (
    <View style={styles.viewUserNoLogged}>
      <Image
        source={require("../../assets/images/undraw_Notify_re_65on.png")}
        style={{ width: 250, height: 250 }}
      />
      <Text style={styles.notFoundText}>
        Inicia sesión para ver tus favoritos
      </Text>
    </View>
  );
}

function Place(props) {
  const { place, setIsLoading, toastRef, setReloadData, navigation } = props;
  const { name, image, price, id, type } = place.item;
  let go = "Home";
  switch (type) {
    case "place":
      go = "Place";
      break;

    case "experience":
      go = "Experience";
      break;

    case "restaurant":
      go = "DescriptionRestaurantScreen";
      break;

    case "hotel":
      go = "DescriptionHotelScreen";
      break;

    case "guia":
      go = "DescriptionGuiaScreen";
      break;

    case "miscelanea":
      go = "DescriptionMiscelaneaScreen";
      break;

    case "other":
      go = "DescriptionOtherScreen";
      break;

    default:
      break;
  }

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Eliminar de Favoritos",
      "¿Estás seguro que deseas eliminar de tus favoritos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: removeFavorite,
        },
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = () => {
    setIsLoading(true);
    db.collection("favorites")
      .where("idFavorite", "==", id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              toastRef.current.show("Eliminado de tus favoritos correctamente");
            })
            .catch(() => {
              setIsLoading(false);
              toastRef.current.show("Error al eliminar");
            });
        });
      });
  };

  return (
    <View style={styles.place}>
      <TouchableOpacity onPress={() => navigation.navigate(go, { id })}>
        <Image
          resizeMode="cover"
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            image[0]
              ? { uri: image[0] }
              : require("../../assets/img/noimage.jpg")
          }
        />
        <View style={styles.info}>
          <Text style={styles.textCard}>{name}</Text>
          <View style={styles.iconStack}>
            <Icon
              type="material-community"
              name={"heart"}
              color={"#c21d17"}
              size={36}
              underlayColor="transparent"
              onPress={confirmRemoveFavorite}
            />
          </View>
          <Text style={{ fontSize: 18 }}>
            {price == null || price == 0 ? "Gratis" : "Desde: $" + price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  viewUserNoLogged: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLoginContainer: {
    marginTop: 20,
    width: "80%",
  },
  btnLogin: {
    backgroundColor: "rgba(32, 14, 50, 1)",
  },
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    marginTop: 40,
  },
  loaderFavorites: {
    marginTop: 10,
    marginBottom: 10,
  },
  place: {
    marginTop: 15,
    marginLeft: 15,
  },
  image: {
    width: "40%",
    height: 140,
    borderRadius: 15,
  },
  info: {
    position: "absolute",
    left: "35%",
    width: "60%",
    height: 140,
    backgroundColor: "#fff",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 15,
    borderColor: "#ddd",
    borderBottomWidth: 0,
  },
  textCard: {
    marginTop: "20%",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconStack: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
});
