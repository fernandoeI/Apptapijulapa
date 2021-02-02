import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import CardService from "../components/CardService";
import ListPlacesHome from "../components/places/ListPlacesHome";
import ListExperiencesHome from "../components/experiences/ListExperienceHome";

const widthScreen = Dimensions.get("window").width;

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import { Icon } from "react-native-elements";

const db = firebase.firestore(firebaseApp);

export default function Home(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [startPlaces, setStartPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExp, setIsLoadingExp] = useState(false);
  const limit = 6;

  const [experiences, setExperiences] = useState([]);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const [startExperiences, setStartExperiences] = useState(null);

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
        .limit(limit)
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

  useFocusEffect(
    useCallback(() => {
      db.collection("experiences")
        .get()
        .then((snap) => {
          setTotalExperiences(snap.size);
        });

      const resultExperiences = [];

      db.collection("experiences")
        .orderBy("createAt", "desc")
        .limit(limit)
        .get()
        .then((response) => {
          setStartExperiences(response.docs[response.docs.length - 1]);
          response.forEach((doc) => {
            const experience = doc.data();
            experience.id = doc.id;
            resultExperiences.push(experience);
          });
          setExperiences(resultExperiences);
        });
    }, [])
  );

  const handleLoadMorePlaces = () => {
    const resultPlaces = [];
    places.length < totalPlaces && setIsLoading(true);

    db.collection("places")
      .orderBy("createAt", "desc")
      .startAfter(startPlaces.data().createAt)
      .limit(limit)
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

  const handleLoadMoreExperiences = () => {
    const resultExperiences = [];
    experiences.length < totalExperiences && setIsLoadingExp(true);

    db.collection("experiences")
      .orderBy("createAt", "desc")
      .startAfter(startExperiences.data().createAt)
      .limit(limit)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartExperiences(response.docs[response.docs.length - 1]);
        } else {
          setIsLoadingExp(false);
        }
        response.forEach((doc) => {
          const experience = doc.data();
          experience.id = doc.id;
          resultExperiences.push(experience);
        });

        setExperiences([...experiences, ...resultExperiences]);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.holaAmy}>Hola</Text>
      <Icon
        raised
        name="heartbeat"
        type="font-awesome"
        color="#f50"
        containerStyle={{ position: "absolute", top: 40, right: 10 }}
        onPress={() => navigation.navigate("Emergency")}
      />

      <Text style={styles.exploraTapijulapa}>Explora Tapijulapa</Text>
      <View style={styles.scrollArea}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.cardSubtitles}>
            <Text style={styles.subtitles}>Sitios de interés</Text>
            <Text
              style={styles.verMas}
              onPress={() => navigation.navigate("AllPlaces")}
            >
              Ver todos
            </Text>
          </View>

          <View style={styles.scrollContent}>
            <ListPlacesHome
              places={places}
              isLoading={isLoading}
              handleLoadMore={handleLoadMorePlaces}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={styles.cardSubtitles}>
            <Text style={styles.subtitles}>Experiencias</Text>
            <Text
              style={styles.verMas}
              onPress={() => navigation.navigate("AllExperiences")}
            >
              Ver todos
            </Text>
          </View>
          <View style={styles.scrollContent}>
            <ListExperiencesHome
              experiences={experiences}
              isLoading={isLoadingExp}
              handleLoadMore={handleLoadMoreExperiences}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <Text style={styles.services}>Servicios</Text>
          <View style={styles.cardServiceRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurants")}
              style={styles.cardService}
            >
              <CardService restaurantes="Gastronomía" icon="gastronomia" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Artesanias")}
              style={styles.cardService}
            >
              <CardService restaurantes="Artesanías" icon="artesanias" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardServiceRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Hotels")}
              style={styles.cardService}
            >
              <CardService restaurantes="Hospedajes" icon="hoteles" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Guias")}
              style={styles.cardService}
            >
              <CardService restaurantes="Guías" icon="guias" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardServiceRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Miscelanea")}
              style={styles.cardService}
            >
              <CardService restaurantes="Tours" icon="tours" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Otros")}
              style={styles.cardService}
            >
              <CardService restaurantes="Otros" icon="otros" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  icon: {
    color: "rgba(32,14,50,1)",
    fontSize: 32,
  },
  scrollArea: {
    flex: 1,
    width: widthScreen,
    marginLeft: 29,
  },
  scrollArea_contentContainerStyle: {
    width: widthScreen * 0.95,
  },
  subtitles: {
    color: "rgba(0,0,0,1)",
    marginLeft: 3,
    fontSize: 16,
  },
  services: {
    color: "rgba(0,0,0,1)",
    marginLeft: 3,
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  cardSubtitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginRight: 30,
  },
  scrollContent: {
    flex: 1,
    marginTop: 10,
    marginLeft: 3,
  },

  cardServiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 30,
  },
  cardService: {
    width: "47%",
  },
  holaAmy: {
    color: "rgba(132,132,132,1)",
    marginTop: "15%",
    marginLeft: 29,
  },
  exploraTapijulapa: {
    color: "#121212",
    height: 40,

    fontSize: 26,
    marginTop: 5,
    marginLeft: 29,
    marginBottom: 5,
  },
  verMas: {
    fontWeight: "bold",
  },
});
