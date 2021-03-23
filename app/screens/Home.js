import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import CardService from "../components/CardService";
import ListPlacesHome from "../components/places/ListPlacesHome";
import ListExperiencesHome from "../components/experiences/ListExperienceHome";
import Carousel from '../components/Carousel'
import { dummyData } from '../data/Data'

const widthScreen = Dimensions.get("window").width;

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import Svg, { Ellipse } from "react-native-svg";

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
  const [news, setNews] = useState([]);

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
      const resultNews = [];

      db.collection("news")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const news = doc.data();
            news.id = doc.id;
            resultNews.push(news);
          });
          setNews(resultNews);
        });
    }, [])
  );

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

      <Svg viewBox="0 0 52.36 52.36" style={styles.ellipse} onPress={() => navigation.navigate("Emergency")}>
        <Ellipse
          strokeWidth={0}
          cx={26}
          cy={26}
          rx={26}
          ry={26}
          fill="rgba(250,250,250,1)"
        ></Ellipse>

        <Image source={require("../../assets/images/emergency.png")} style={styles.emergency} />
      </Svg>
      <Text style={styles.exploraTapijulapa}>Explora Tapijulapa</Text>

      <ScrollView>
        <Carousel data={news} />
        <View style={styles.cardSubtitles}>
          <Text style={styles.subtitles}>Sitios de interés público</Text>
          <Text
            style={styles.verMas}
            onPress={() => navigation.navigate("AllPlaces")}
          >
            Ver todos
            </Text>
        </View>

        <ListPlacesHome
          places={places}
          isLoading={isLoading}
          handleLoadMore={handleLoadMorePlaces}
          keyExtractor={(item, index) => index.toString()}
        />


        <View style={styles.cardSubtitles}>
          <Text style={styles.subtitles}>Experiencias</Text>
          <Text
            style={styles.verMas}
            onPress={() => navigation.navigate("AllExperiences")}
          >
            Ver todos
            </Text>
        </View>
        <ListExperiencesHome
          experiences={experiences}
          isLoading={isLoadingExp}
          handleLoadMore={handleLoadMoreExperiences}
          keyExtractor={(item, index) => index.toString()}
        />


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

    </View >
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
    marginLeft: 15,
  },
  cardSubtitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10
  },
  scrollContent: {
    flex: 1,
    marginTop: 10,
  },

  cardServiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 15
  },
  cardService: {
    width: "47%",
  },
  holaAmy: {
    color: "rgba(132,132,132,1)",
    marginTop: "15%",
    marginLeft: 15,
  },
  exploraTapijulapa: {
    color: "#121212",
    height: 40,
    fontSize: 26,
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 5,
  },
  verMas: {
    fontWeight: "bold",
  },
  emergency: {
    height: 30,
    width: 30,
    marginTop: 10,
    marginLeft: 10
  },
  ellipse: {
    top: 47,
    right: 17,
    width: 52,
    height: 52,
    position: "absolute",
    elevation: 6,
    borderRadius: 360,
  },
});
