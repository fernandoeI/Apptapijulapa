import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { SearchBar } from "react-native-elements";

import ListExperiences from "../../components/guias/ListExperiences";

import Icon from "react-native-vector-icons/Entypo";
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
  const limit = 5;

  useEffect(() => {
    if (search) {
      fireSQL
        .query(
          `SELECT * FROM users WHERE giro="guia" AND name LIKE '${search}%' OR area LIKE '${search}%'   `
        )
        .then((response) => {
          setExperiences(response);
        });
    }
  }, [search]);

  useEffect(() => {
    db.collection("users")
      .where("giro", "==", "guia")
      .where("isVisible", "==", true)
      .get()
      .then((snap) => {
        setTotalExperiences(snap.size);
      });

    const resultExperiences = [];

    db.collection("users")
      .where("giro", "==", "guia")
      .where("isVisible", "==", true)
      .orderBy("ratingOrder", "desc")
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

    db.collection("users")
      .where("giro", "==", "guia")
      .where("isVisible", "==", true)
      .orderBy("ratingOrder", "desc")
      .startAfter(startExperiences.data().ratingOrder)
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
      <View style={styles.groupRow}>
        <View style={styles.group}>
          <View style={styles.iconStack}>
            <Icon name="chevron-small-left" style={styles.icon}></Icon>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={styles.button}
            ></TouchableOpacity>
          </View>
        </View>
        <View style={styles.ellipseStack}>
          <Svg viewBox="0 0 52.67 52.67" style={styles.ellipse}>
            <Ellipse
              stroke="rgba(230, 230, 230,1)"
              strokeWidth={0}
              fill="rgba(255,255,255,1)"
              cx={26}
              cy={26}
              rx={26}
              ry={26}
            ></Ellipse>
          </Svg>
          <Image
            source={require("../../../assets/images/guias.png")}
            resizeMode="contain"
            style={styles.image}
          ></Image>
        </View>
      </View>
      <Text style={styles.loremIpsum}>Guías</Text>

      <SearchBar
        placeholder="Buscar Guías"
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        lightTheme={true}
      />
      <View style={styles.todosLosHotelesRow}>
        <Text style={styles.todosLosHoteles}>Todos los guias</Text>
      </View>
      <View style={styles.scrollContent}>
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
    </View>
  );
}

function NoFound() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={require("../../../assets/images/undraw_page_not_found_su7k.png")}
        resizeMode="contain"
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ fontWeight: "bold", marginTop: -50, fontSize: 18 }}>
        No encontramos lo que buscas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  groupRow: {
    height: 53,
    flexDirection: "row",
    marginTop: 48,
    marginLeft: 11,
    marginRight: 161,
  },
  group: {
    width: 49,
    height: 49,
  },
  iconStack: {
    width: 49,
    height: 49,
  },
  icon: {
    top: 3,
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button: {
    top: 0,
    left: 0,
    width: 49,
    height: 49,
    position: "absolute",
  },
  image: {
    top: 8,
    left: 10,
    width: 33,
    height: 33,
    position: "absolute",
  },
  ellipseStack: {
    width: 53,
    height: 53,
    marginLeft: 101,
  },
  ellipse: {
    top: 0,
    width: 53,
    height: 53,
    position: "absolute",
    left: 0,
  },
  loremIpsum: {
    color: "#121212",
    fontSize: 28,
    marginTop: 25,
    marginLeft: 10,
  },
  input: {
    marginTop: 15,
    width: "95%",
    height: 42,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginLeft: 10,
  },
  todosLosHoteles: {
    color: "#121212",
  },
  ordenar: {
    color: "rgba(132,132,132,1)",
    marginLeft: 124,
  },
  todosLosHotelesRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  scrollContent: {
    height: "60%",
  },
  searchBar: {
    width: "98%",
    marginRight: 20,
  },
});
