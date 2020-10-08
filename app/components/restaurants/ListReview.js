import React, { useState, useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating, Icon } from "react-native-elements";
import { map } from "lodash";
import SimplePopupMenu from "react-native-simple-popup-menu";
import Toast from "react-native-easy-toast";

import { useFocusEffect } from "@react-navigation/native";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function ListReview(props) {
  const { navigation, idRestaurant } = props;
  const [userLogged, setUserLogged] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState([]);
  const [reviewState, setReviewState] = useState(false);
  const toastRef = useRef();
  const user = firebase.auth().currentUser;
  const items = [
    { id: "edit", label: "Editar" },
    { id: "delete", label: "Eliminar" },
  ];

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("reviewsRestaurant")
        .where("idRestaurant", "==", idRestaurant)
        .get()
        .then((response) => {
          const resultReview = [];
          response.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            resultReview.push(data);
          });
          setReviews(resultReview);
        });
    }, [reviewState])
  );

  useFocusEffect(
    useCallback(() => {
      if (user != 0) {
        db.collection("reviewsRestaurant")
          .where("idUser", "==", user.uid)
          .where("idRestaurant", "==", idRestaurant)
          .get()
          .then((response) => {
            const resultMyReview = [];
            response.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              resultMyReview.push(data);
            });
            setMyReview(resultMyReview);
          });
      }
    }, [reviewState])
  );

  const eHandle = (e) => {
    if (e.id == "edit") {
      navigation.navigate("AddReviewRestaurant", {
        idRestaurant,
        option: e.id,
      });
    } else if (e.id == "delete") {
      db.collection("reviewsRestaurant")
        .where("idRestaurant", "==", idRestaurant)
        .where("idUser", "==", user.uid)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const idReview = doc.id;
            db.collection("reviewsRestaurant")
              .doc(idReview)
              .delete()
              .then(() => {
                toastRef.current.show("Comentario eliminado");
                setReviewState(true);
              })
              .catch(() => {
                toastRef.current.show("Error al eliminar el comentario");
              });
          });
        });
    }
  };

  return (
    <View>
      {map(reviews.slice(0, 3), (review, index) => (
        <Review key={index} review={review} />
      ))}
      {userLogged ? (
        <View>
          {myReview.length > 0 ? (
            <View style={{ paddingTop: 15 }}>
              <Text style={styles.subtitles}>Tu opinión</Text>
              <View style={styles.viewReview}>
                <View style={styles.viewImageAvatar}>
                  <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={
                      (myReview.length > 0 ? myReview[0].avatarUser : "")
                        ? { uri: myReview[0].avatarUser }
                        : require("../../../assets/img/avatar-default.png")
                    }
                  />
                </View>
                <View style={styles.viewInfo}>
                  <Text style={styles.reviewUserName}>
                    {myReview.length > 0 ? myReview[0].nameuser : ""}
                  </Text>
                  <Rating
                    imageSize={15}
                    startingValue={
                      myReview.length > 0 ? myReview[0].rating : ""
                    }
                    readonly
                  />

                  <Text style={styles.reviewText}>
                    {myReview.length > 0 ? myReview[0].review : ""}
                  </Text>
                </View>
                <SimplePopupMenu
                  items={items}
                  style={styles.button}
                  onSelect={(e) => eHandle(e)}
                >
                  <Icon
                    type="material-community"
                    name="dots-vertical"
                    color="#000"
                    size={36}
                    underlayColor="transparent"
                  />
                </SimplePopupMenu>
              </View>
            </View>
          ) : (
            <Button
              title="Escribe una opinión"
              buttonStyle={styles.btnAddReview}
              titleStyle={styles.btnTitleAddReview}
              icon={{
                type: "material-community",
                name: "square-edit-outline",
                color: "#200E32",
              }}
              onPress={() =>
                navigation.navigate("AddReviewRestaurant", {
                  idRestaurant: idRestaurant,
                  option: "add",
                })
              }
            />
          )}
          <Text
            style={styles.verMas}
            onPress={() =>
              navigation.navigate("AllReviewsRestaurant", { reviews })
            }
          >
            Ver todos
          </Text>
        </View>
      ) : (
        <View>
          <Text style={{ textAlign: "center", color: "#200E32", padding: 20 }}>
            Para escribir un comentario necesitas estar logueado{" "}
          </Text>
        </View>
      )}

      {/* {map(reviews, (review, index) => (
        <Review key={index} review={review} />
      ))} */}
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

function Review(props) {
  const { review, rating, createAt, avatarUser, nameUser } = props.review;
  const createReview = new Date(createAt.seconds * 1000);

  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <Avatar
          size="large"
          rounded
          containerStyle={styles.imageAvatarUser}
          source={
            avatarUser
              ? { uri: avatarUser }
              : require("../../../assets/img/avatar-default.png")
          }
        />
      </View>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewUserName}>{nameUser}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewDate}>
          {createReview.getDate()}/
          {createReview.getMonth() + 1 < 10
            ? "0" + (createReview.getMonth() + 1)
            : createReview.getMonth() + 1}
          /{createReview.getFullYear()}
        </Text>
        <Text style={styles.reviewText}>{review}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  verMas: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  btnAddReview: {
    backgroundColor: "transparent",
    marginTop: 25,
  },
  btnTitleAddReview: {
    color: "#200E32",
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
    paddingTop: 20,
  },
  viewImageAvatar: {
    marginRight: 15,
  },
  imageAvatarUser: {
    width: 60,
    height: 60,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewUserName: {
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    left: 80,
    top: 15,
  },
  subtitles: {
    color: "rgba(0,0,0,1)",
    marginLeft: 22,
    marginTop: 15,
    fontWeight: "bold",
  },
});
