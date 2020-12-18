import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";

import ListPlaces from "../../components/places/ListPlaces";

import IconEntypo from "react-native-vector-icons/Entypo";
import Svg, { Ellipse } from "react-native-svg";

import { FireSQL } from "firesql";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
const db = firebase.firestore(firebaseApp);

export default function AllPlaces(props) {
  const { route } = props;
  const [places, setPlaces] = useState([]);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [startPlaces, setStartPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const limit = 30;

  useEffect(() => {
    if (search) {
      fireSQL
        .query(
          `SELECT * FROM places WHERE name LIKE '${search}%' OR area LIKE '${search}%' `
        )
        .then((response) => {
          setPlaces(response);
        });
    } else if (!search) {
    }
  }, [search]);

  useEffect(() => {
    db.collection("places")
      .get()
      .then((snap) => {
        setTotalPlaces(snap.size);
      });

    const resultPlaces = [];

    db.collection("places")
      .orderBy("ratingOrder", "desc")
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
  }, []);

  const handleLoadMorePlaces = () => {
    const resultPlaces = [];
    places.length < totalPlaces && setIsLoading(true);

    db.collection("places")
      .orderBy("ratingOrder", "desc")
      .startAfter(startPlaces.data().ratingOrder)
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
            source={require("../../../assets/images/lugares.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </Svg>
      </View>
      <Text style={styles.loremIpsum}>Sitios de Interés</Text>
      <SearchBar
        placeholder="Buscar sitios "
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
        lightTheme={true}
      />
      <View style={styles.todosLosHotelesRow}>
        <Text style={styles.todosLosHoteles}>Todos los sitios</Text>
      </View>

      {places.length === 0 ? (
        <NoFound />
      ) : (
        <ListPlaces
          places={places}
          isLoading={isLoading}
          handleLoadMore={handleLoadMorePlaces}
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
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    flexDirection: "row",
    marginTop: 48,
    marginLeft: 11,
    marginRight: 161,
    justifyContent: "space-between",
    width: "52%",
  },
  button: {
    width: 49,
    height: 49,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
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

// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, Text, FlatList, Image } from "react-native";
// import { SearchBar, ListItem, Icon } from "react-native-elements";
// import { FireSQL } from "firesql";
// import firebase from "firebase/app";
// import "firebase/firestore";

// const fireSQL = new FireSQL(firebase.firestore());

// export default function Search(props) {
//   const { navigation } = props;
//   const [search, setSearch] = useState("");
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     if (search) {
//       fireSQL
//         .query(`SELECT * FROM places WHERE name LIKE '${search}%' `)
//         .then((response) => {
//           setRestaurants(response);
//           console.warn(restaurants);
//         });
//     }
//   }, [search]);

//   return (
//     <View>
//       <SearchBar
//         placeholder="Busca tu restaurante..."
//         onChangeText={(e) => setSearch(e)}
//         value={search}
//         containerStyle={styles.searchBar}
//       />
//       {restaurants.length === 0 ? (
//         <NoFoundRestaurants />
//       ) : (
//         <View>
//           <Text>Hola</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// function NoFoundRestaurants() {
//   return (
//     <View style={{ flex: 1, alignItems: "center" }}>
//       <Image
//         source={require("../../../assets/img/noimage.jpg")}
//         resizeMode="cover"
//         style={{ width: 200, height: 200 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   searchBar: {
//     marginBottom: 20,
//   },
// });
