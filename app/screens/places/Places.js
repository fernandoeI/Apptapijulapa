import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import ListPlaces from "../../components/places/ListPlaces";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Places(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState([]);
  const [startPlaces, setStartPlaces] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPlaces, setTotalPlaces] = useState(0);
  const [isReloadPlace, setIsReloadPlace] = useState(false);
  const limitPlaces = 5;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("places")
      .get()
      .then(snap => {
        setTotalPlaces(snap.size);
      });

    (async () => {
      const resultPlaces = [];

      const places = db
        .collection("places")
        .orderBy("createAt", "desc")
        .limit(limitPlaces);

      await places.get().then(response => {
        setStartPlaces(response.docs[response.docs.length - 1]);

        response.forEach(doc => {
          let place = doc.data();
          place.id = doc.id;
          resultPlaces.push({ place });
        });
        setPlaces(resultPlaces);
      });
    })();
    setIsReloadPlace(false);
  }, [isReloadPlace]);

  const handleLoadMore = async () => {
    const resultPlaces = [];
    places.length < totalPlaces && setIsLoading(true);

    const placesDb = db
      .collection("places")
      .orderBy("createAt", "desc")
      .startAfter(startPlaces.data().createAt)
      .limit(limitPlaces);

    await placesDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartPlaces(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let place = doc.data();
        place.id = doc.id;
        resultPlaces.push({ place });
      });

      setPlaces([...places, ...resultPlaces]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListPlaces
        places={places}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
      />
      {user && (
        <AddPlaceButton
          navigation={navigation}
          setIsReloadPlace={setIsReloadPlace}
        />
      )}
    </View>
  );
}

function AddPlaceButton(props) {
  const { navigation, setIsReloadPlace } = props;
  return (
    <ActionButton
      buttonColor="rgb(34, 21, 81 )"
      onPress={() => navigation.navigate("AddPlace", { setIsReloadPlace })}
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
