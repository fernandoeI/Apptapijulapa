import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

function CommentCard(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.image5Row}>
        <Image
          source={require("../assets/images/amlo.jpg")}
          resizeMode="cover"
          style={styles.image5}
        ></Image>
        <View style={styles.andresManuelRowColumn}>
          <View style={styles.andresManuelRow}>
            <Text style={styles.andresManuel}>Andres Manuel</Text>
            <Text style={styles.loremIpsum7}>25/04/2020</Text>
          </View>
          <View style={styles.group}>
            <View style={styles.image6Row}>
              <Image
                source={require("../assets/images/icons8-estrella-96.png")}
                resizeMode="contain"
                style={styles.image6}
              ></Image>
              <Image
                source={require("../assets/images/icons8-estrella-96.png")}
                resizeMode="contain"
                style={styles.image7}
              ></Image>
              <Image
                source={require("../assets/images/icons8-estrella-96.png")}
                resizeMode="contain"
                style={styles.image8}
              ></Image>
              <Image
                source={require("../assets/images/icons8-estrella-96.png")}
                resizeMode="contain"
                style={styles.image9}
              ></Image>
              <Image
                source={require("../assets/images/icons8-estrella-96.png")}
                resizeMode="contain"
                style={styles.image10}
              ></Image>
            </View>
          </View>
          <Text style={styles.loremIpsum5}>
            Lorem Ipsum knjnin uniuniuniun uiniu jnjh{"\n"}jinjinin ininj trsctv
            kncub iubgbuy uybu.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image5: {
    width: 51,
    height: 51,
    borderWidth: 1,
    borderColor: "rgba(250,250,250,1)",
    borderRadius: 100,
  },
  andresManuel: {
    color: "#121212",
    marginLeft: -1,
  },
  loremIpsum7: {
    color: "#121212",
    marginLeft: 90,
  },
  andresManuelRow: {
    height: 17,
    flexDirection: "row",
  },
  group: {
    width: 77,
    height: 15,
    flexDirection: "row",
    marginTop: 1,
    marginLeft: -1,
  },
  image6: {
    width: 15,
    height: 15,
  },
  image7: {
    width: 15,
    height: 15,
    marginLeft: 2,
  },
  image8: {
    width: 15,
    height: 15,
  },
  image9: {
    width: 15,
    height: 15,
  },
  image10: {
    width: 15,
    height: 15,
  },
  image6Row: {
    height: 15,
    flexDirection: "row",
    flex: 1,
  },
  loremIpsum5: {
    color: "#121212",
    marginTop: 7,
    marginLeft: -1,
  },
  andresManuelRowColumn: {
    width: 257,
    marginLeft: 14,
  },
  image5Row: {
    height: 74,
    flexDirection: "row",
  },
});

export default CommentCard;
