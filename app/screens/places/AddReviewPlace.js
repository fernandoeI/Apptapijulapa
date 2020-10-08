import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function AddReviewPlace(props) {
  const { navigation, route } = props;
  const { idPlace, option } = route.params;
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const addReview = () => {
    if (!rating) {
      toastRef.current.show("No has dado ninguna puntuación");
    } else if (!review) {
      toastRef.current.show("El comentario es obligatorio");
    } else {
      setIsLoading(true);
      const user = firebase.auth().currentUser;
      const payload = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idPlace: idPlace,
        review: review,
        rating: rating,
        ratingOrder: "" + rating + "",
        createAt: new Date(),
        nameUser: user.displayName,
      };

      db.collection("reviewsPlace")
        .add(payload)
        .then(() => {
          updatePlace();
        })
        .catch(() => {
          toastRef.current.show("Error al enviar el comentario");
          setIsLoading(false);
        });
    }
  };

  const editReview = () => {
    if (!rating) {
      toastRef.current.show("No has dado ninguna puntuación");
    } else if (!review) {
      toastRef.current.show("El comentario es obligatorio");
    } else {
      const payload = {
        review: review,
        rating: rating,
        ratingOrder: "" + rating + "",
        createAt: new Date(),
      };
      setIsLoading(true);
      const user = firebase.auth().currentUser;

      db.collection("reviewsPlace")
        .where("idPlace", "==", idPlace)
        .where("idUser", "==", user.uid)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const idReview = doc.id;
            db.collection("reviewsPlace")
              .doc(idReview)
              .update(payload)
              .then(() => {
                updatePlace();
              })
              .catch(() => {
                toastRef.current.show("Error al enviar el comentario");
                setIsLoading(false);
              });
          });
        });
    }
  };

  const updatePlace = () => {
    const placeRef = db.collection("places").doc(idPlace);

    placeRef.get().then((response) => {
      const placeData = response.data();
      const ratingTotal = placeData.ratingTotal + rating;
      const quantityVoting = placeData.quantityVoting + 1;
      const ratingResult = parseFloat(
        (ratingTotal / quantityVoting).toString().substr(0, 3)
      );
      placeRef
        .update({
          rating: ratingResult,
          ratingTotal,
          quantityVoting,
          ratingOrder: "" + ratingResult + "",
        })
        .then(() => {
          setIsLoading(false);
          navigation.goBack();
        });
    });
  };

  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Pésimo", "Malo", "Regular", "Bueno", "Excelente!"]}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => setRating(value)}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Comentario..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setReview(e.nativeEvent.text)}
        />
        <Button
          title="Enviar comentario"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={option == "add" ? addReview : editReview}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Enviando comentario" />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#200E32",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },

  viewBody: {
    flex: 1,
    marginTop: 50,
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2",
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
});
