import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Rating } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";

import { map } from "lodash";

export default function AllReviewsPlace(props) {
  const { route } = props;
  const { reviews } = route.params;

  return (
    <View>
      <Text style={{ fontSize: 18, textAlign: "center", marginTop: 50 }}>
        Todos los comentarios
      </Text>
      <ScrollView>
        {map(reviews, (review, index) => (
          <Review key={index} review={review} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.button}
      >
        <Icon name="chevron-small-left" style={styles.icon} />
      </TouchableOpacity>
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
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button: {
    position: "absolute",
    marginTop: 45,
    marginLeft: 10,
    width: 50,
  },
});
