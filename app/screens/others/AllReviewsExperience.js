import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Rating } from "react-native-elements";

import { map } from "lodash";

export default function AllReviewsOthers(props) {
  const { route } = props;
  const { reviews } = route.params;

  return (
    <View style={styles.viewBody}>
      {map(reviews, (review, index) => (
        <Review key={index} review={review} />
      ))}
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
  viewBody: {
    flex: 1,
    marginTop: 30,
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
});
