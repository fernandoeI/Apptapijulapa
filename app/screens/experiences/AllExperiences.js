import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { SearchBar } from "react-native-elements";

import ListExperiences from "../../components/experiences/ListExperiences";

import IconEntypo from "react-native-vector-icons/Entypo";
import Svg, { Ellipse } from "react-native-svg";

import { FireSQL } from "firesql";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
const db = firebase.firestore(firebaseApp);

export default function AllExperiences(props) {
  const [experiences, setExperiences] = useState([]);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const [startExperiences, setStartExperiences] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const limit = 30;

  useEffect(() => {
    if (search) {
      fireSQL
        .query(
          `SELECT * FROM experiences WHERE name LIKE '${search}%' OR area LIKE '${search}%' `
        )
        .then((response) => {
          setExperiences(response);
        });
    }
  }, [search]);

  useEffect(() => {
    db.collection("experiences")
      .get()
      .then((snap) => {
        setTotalExperiences(snap.size);
      });

    const resultExperiences = [];

    db.collection("experiences")
      .orderBy("rating", "desc")
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
  }, []);

  const handleLoadMoreExperiences = () => {
    const resultExperiences = [];
    experiences.length < totalExperiences && setIsLoading(true);

    db.collection("experiences")
      .orderBy("rating", "desc")
      .startAfter(startExperiences.data().rating)
      .limit(limit)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartExperiences(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
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
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.button}
        >
          <IconEntypo name="chevron-small-left" style={styles.icon} />
        </TouchableOpacity>

        <Svg viewBox="0 0 52.67 52.67" style={styles.ellipse}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            fill="rgba(255,255,255,1)"
            cx={26}
            cy={26}
            rx={26}
            ry={26}
          />
          <Image
            source={require("../../../assets/images/experiencias.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </Svg>
      </View>
      <Text style={styles.loremIpsum}>Experiencias</Text>
      <SearchBar
        placeholder="Buscar experiencias"
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        lightTheme={true}
      />
      <View style={styles.todosLosHotelesRow}>
        <Text style={styles.todosLosHoteles}>Todas las experiencias </Text>
      </View>

      {experiences.length === 0 ? (
        <NoFound />
      ) : (
        <ListExperiences
          experiences={experiences}
          isLoading={isLoading}
          handleLoadMore={handleLoadMoreExperiences}
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFound() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../../assets/images/undraw_the_search_s0xf.png")}
        resizeMode="contain"
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        No encontramos lo que buscas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    flexDirection: "row",
    marginTop: 45,
    justifyContent: "space-between",
    width: "58%",
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button: {
    width: 49,
    height: 49,
  },
  image: {
    width: 33,
    height: 33,
    position: "absolute",
    marginTop: 10,
    marginLeft: 10,
  },

  ellipse: {
    width: 53,
    height: 53,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loremIpsum: {
    color: "#121212",
    fontSize: 28,
    marginTop: 25,
    marginLeft: 10,
    marginBottom: 10,
  },

  todosLosHoteles: {
    color: "#121212",
    fontWeight: "bold",
  },
  todosLosHotelesRow: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 10,
  },
  searchBar: {
    width: "98%",
    marginRight: 20,
  },
});
