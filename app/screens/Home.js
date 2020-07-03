import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";

import CardImage from "../components/CardImage";
import CardService from "../components/CardService";
import ListPlacesHome from "../components/places/ListPlacesHome";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Home(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [startPlaces, setStartPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitPlaces = 5;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      db.collection("places")
        .get()
        .then((snap) => {
          setTotalPlaces(snap.size);
        });

      const resultPlaces = [];

      db.collection("places")
        .orderBy("createAt", "desc")
        .limit(limitPlaces)
        .get()
        .then((response) => {
          setStartPlaces(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            const place = doc.data();
            place.id = doc.id;
            resultPlaces.push(place);
          });
          setPlaces(resultPlaces);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultPlaces = [];
    places.length < totalPlaces && setIsLoading(true);

    db.collection("places")
      .orderBy("createAt", "desc")
      .startAfter(startPlaces.data().createAt)
      .limit(limitPlaces)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartPlaces(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }
        response.forEach((doc) => {
          const place = doc.data();
          place.id = doc.id;
          resultPlaces.push(place);
        });

        setPlaces([...places, ...resultPlaces]);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.cardSubtitles}>
            <Text style={styles.subtitles}>Lugares</Text>
            {user && (
              <Icon
                name="ios-add-circle-outline"
                style={styles.icon}
                onPress={() => navigation.navigate("AddPlace")}
              ></Icon>
            )}
          </View>

          <View style={styles.scrollContent}>
            <ListPlacesHome
              places={places}
              isLoading={isLoading}
              handleLoadMore={handleLoadMore}
            />
          </View>
          <Text style={styles.subtitles}>Experiencias</Text>
          <View style={styles.scrollContent}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.scrollContent_contentContainerStyle}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.cardImageRow}>
                <CardImage style={styles.cardImage}></CardImage>
                <CardImage style={styles.cardImage}></CardImage>
                <CardImage style={styles.cardImage}></CardImage>
              </View>
            </ScrollView>
          </View>
          <Text style={styles.subtitles}>Servicios</Text>
          <View style={styles.cardServiceRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurants")}
            >
              <CardService
                restaurantes="Alimentos"
                style={styles.cardServiceLeft}
              ></CardService>
            </TouchableOpacity>

            <CardService
              iconName="md-restaurant"
              restaurantes="Artesanias"
              icon="ios-cart"
              style={styles.cardServiceRight}
            ></CardService>
          </View>
          <View style={styles.cardServiceRow}>
            <TouchableOpacity onPress={() => navigation.navigate("Hotels")}>
              <CardService
                iconName="md-restaurant"
                restaurantes="Hospedaje"
                icon="ios-business"
                style={styles.cardServiceLeft}
              ></CardService>
            </TouchableOpacity>
            <CardService
              iconName="md-restaurant"
              restaurantes="Guías"
              icon="ios-people"
              style={styles.cardServiceRight}
            ></CardService>
          </View>
          <View style={styles.cardServiceRow}>
            <CardService
              iconName="md-restaurant"
              restaurantes="Miscelanea"
              icon="ios-basket"
              style={styles.cardServiceLeft}
            ></CardService>
            <CardService
              iconName="md-restaurant"
              restaurantes="Otros"
              icon="ios-glasses"
              style={styles.cardServiceRight}
            ></CardService>
          </View>
        </ScrollView>
      </View>
      <Text style={styles.holaAmy}>Hola, Amy</Text>
      <Text style={styles.exploraTapijulapa}>Explora Tapijulapa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250,250,250,1)",
  },
  icon: {
    color: "rgba(32,14,50,1)",
    fontSize: 32,
  },
  scrollArea: {
    width: 346,
    height: 583,
    marginTop: 143,
    marginLeft: 29,
  },
  scrollArea_contentContainerStyle: {
    height: 895,
    width: 346,
  },
  subtitles: {
    color: "rgba(0,0,0,1)",
    marginLeft: 3,
    marginTop: 10,
    fontSize: 16,
    width: 290,
  },
  cardSubtitles: {
    flexDirection: "row",
  },
  scrollContent: {
    height: 211,
    marginTop: 14,
    marginLeft: 3,
  },
  scrollContent_contentContainerStyle: {
    width: 460,
    height: 211,
    overflow: "visible",
    flexDirection: "row",
  },
  cardImage: {
    height: 223,
    width: 133,
    marginRight: 16,
  },

  cardImageRow: {
    height: 223,
    flexDirection: "row",
    flex: 1,
    marginRight: 27,
  },

  cardServiceLeft: {
    height: 89,
    width: 138,
  },
  cardServiceRight: {
    width: 138,
    height: 89,
    marginLeft: 12,
  },
  cardServiceRow: {
    height: 89,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 3,
    marginRight: 55,
  },

  holaAmy: {
    color: "rgba(132,132,132,1)",
    marginTop: -662,
    marginLeft: 29,
  },
  exploraTapijulapa: {
    color: "#121212",
    height: 42,
    width: 268,
    fontSize: 28,
    marginTop: 7,
    marginLeft: 28,
  },
});
