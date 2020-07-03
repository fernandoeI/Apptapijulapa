import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ActionButton from "react-native-action-button";
import ListExperiences from "../../components/experiences/ListExperiences";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Experiences(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [startExperiences, setStartExperiences] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalExperiences, setTotalExperiences] = useState(0);
  const [isReloadExperience, setIsReloadExperience] = useState(false);
  const limitExperiences = 5;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("experiences")
      .get()
      .then(snap => {
        setTotalExperiences(snap.size);
      });

    (async () => {
      const resultExperiences = [];

      const experiences = db
        .collection("experiences")
        .orderBy("createAt", "desc")
        .limit(limitExperiences);

      await experiences.get().then(response => {
        setStartExperiences(response.docs[response.docs.length - 1]);

        response.forEach(doc => {
          let experience = doc.data();
          experience.id = doc.id;
          resultExperiences.push({ experience });
        });
        setExperiences(resultExperiences);
      });
    })();
    setIsReloadExperience(false);
  }, [isReloadExperience]);

  const handleLoadMore = async () => {
    const resultExperiences = [];
    experience.length < totalExperiences && setIsLoading(true);

    const experiencesDb = db
      .collection("experiences")
      .orderBy("createAt", "desc")
      .startAfter(startExperiences.data().createAt)
      .limit(limitExperiences);

    await experiencesDb.get().then(response => {
      if (response.docs.length > 0) {
        setStartExperiences(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }

      response.forEach(doc => {
        let experience = doc.data();
        experience.id = doc.id;
        resultExperiences.push({ experience });
      });

      setExperiences([...experiences, ...resultExperiences]);
    });
  };

  return (
    <View style={styles.viewBody}>
      <ListExperiences
        experiences={experiences}
        isLoading={isLoading}
        handleLoadMore={handleLoadMore}
      />
      {user && (
        <AddExperienceButton
          navigation={navigation}
          setIsReloadExperience={setIsReloadExperience}
        />
      )}
    </View>
  );
}

function AddExperienceButton(props) {
  const { navigation, setIsReloadExperience } = props;
  return (
    <ActionButton
      buttonColor="rgb(34, 21, 81 )"
      onPress={() =>
        navigation.navigate("AddExperiences", { setIsReloadExperience })
      }
    />
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
});
