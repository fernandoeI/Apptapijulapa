import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Svg, { Path, Ellipse } from "react-native-svg";
import BasicInformation from "../components/BasicInformation";
import LocationCard from "../components/LocationCard";
import PeopleCard from "../components/PeopleCard";
import CommentCard from "../components/CommentCard";
import BarMenu from "../components/BarMenu";

function DescriptionHoteles(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rect1StackStack}>
        <View style={styles.rect1Stack}>
          <View style={styles.rect1}>
            <Text style={styles.hoteles1}>HOTELES</Text>
            <View style={styles.casaTapijulapa1Row}>
              <Text style={styles.casaTapijulapa1}>Casa Tapijulapa</Text>
              <View style={styles.icon1Stack}>
                <IoniconsIcon
                  name="ios-heart-empty"
                  style={styles.icon1}
                ></IoniconsIcon>
                <TouchableOpacity style={styles.button1}></TouchableOpacity>
              </View>
            </View>
          </View>
          <ImageBackground
            source={require("../assets/images/hotel.jpg")}
            resizeMode="cover"
            style={styles.image1}
            imageStyle={styles.image1_imageStyle}
          >
            <View style={styles.group}>
              <View style={styles.icon2Stack}>
                <EntypoIcon
                  name="chevron-small-left"
                  style={styles.icon2}
                ></EntypoIcon>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={styles.button2}
                ></TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.rect2}></View>
          <View style={styles.scrollArea1}>
            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.scrollArea1_contentContainerStyle}
            >
              <View style={styles.acercaDe1Row}>
                <Text style={styles.acercaDe1}>Acerca de</Text>
                <Text style={styles.loremIpsum4}>4.9</Text>
                <Image
                  source={require("../assets/images/icons8-estrella-96.png")}
                  resizeMode="contain"
                  style={styles.image5}
                ></Image>
              </View>
              <Text style={styles.loremIpsum3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing {"\n"}elit.
                Mauris tincidunt enim eu lorem egestas egestas. {"\n"}Etiam
                bibendum lorem sed placerat mattis.
              </Text>
              <Text style={styles.informacionBasica1}>Información básica</Text>
              <View style={styles.scrollArea2}>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={
                    styles.scrollArea2_contentContainerStyle
                  }
                >
                  <Svg viewBox="0 0 68.91 19.8" style={styles.path1}>
                    <Path
                      strokeWidth="0"
                      stroke="grey"
                      fill="rgba(230, 230, 230,1)"
                      type="path"
                      d="M0.00 0.00 L68.91 19.80 L0.00 0.00 Z"
                    ></Path>
                  </Svg>
                  <View style={styles.basicInformation1Row}>
                    <BasicInformation
                      style={styles.basicInformation1}
                    ></BasicInformation>
                    <BasicInformation
                      mejoresMeses="Abierto de"
                      junAgo="Lun - Vie"
                      style={styles.basicInformation2}
                    ></BasicInformation>
                    <BasicInformation
                      mejoresMeses="Horario"
                      junAgo="10:00 - 15:00 hr"
                      style={styles.basicInformation3}
                    ></BasicInformation>
                    <LocationCard style={styles.locationCard1}></LocationCard>
                  </View>
                </ScrollView>
              </View>
              <Text style={styles.tusGuias1}>Tus guías</Text>
              <PeopleCard style={styles.peopleCard1}></PeopleCard>
              <View style={styles.comentarios1Row}>
                <Text style={styles.comentarios1}>Comentarios</Text>
                <View style={styles.ellipse1Stack}>
                  <Svg viewBox="0 0 29.75 29.75" style={styles.ellipse1}>
                    <Ellipse
                      strokeWidth={0}
                      fill="rgba(255,255,255,1)"
                      cx={15}
                      cy={15}
                      rx={15}
                      ry={15}
                    ></Ellipse>
                  </Svg>
                  <Text style={styles.loremIpsum2}>10</Text>
                </View>
              </View>
              <CommentCard style={styles.commentCard1}></CommentCard>
              <CommentCard style={styles.commentCard2}></CommentCard>
              <CommentCard style={styles.commentCard3}></CommentCard>
              <Text style={styles.verTodos1}>Ver todos</Text>
              <Text style={styles.galeria1}>Galeria</Text>
              <View style={styles.scrollArea3}>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={
                    styles.scrollArea3_contentContainerStyle
                  }
                >
                  <View style={styles.image2Row}>
                    <Image
                      source={require("../assets/images/ruinas.jpg")}
                      resizeMode="cover"
                      style={styles.image2}
                    ></Image>
                    <Image
                      source={require("../assets/images/iglesia.jpg")}
                      resizeMode="cover"
                      style={styles.image3}
                    ></Image>
                    <Image
                      source={require("../assets/images/rio.jpg")}
                      resizeMode="cover"
                      style={styles.image4}
                    ></Image>
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
        <Text style={styles.loremIpsum1}></Text>
      </View>
      <BarMenu style={styles.barMenu1}></BarMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250,250,250,1)",
  },
  rect1: {
    top: 26,
    left: 0,
    width: 375,
    height: 240,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  hoteles1: {
    color: "rgba(255,255,255,1)",
    letterSpacing: 2,
    fontSize: 12,
    marginTop: 151,
    marginLeft: 22,
  },
  casaTapijulapa1: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 6,
  },
  icon1: {
    top: 0,
    left: 2,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 43,
    width: 33,
  },
  button1: {
    top: 0,
    left: 0,
    width: 40,
    height: 43,
    position: "absolute",
  },
  icon1Stack: {
    width: 40,
    height: 43,
    marginLeft: 127,
  },
  casaTapijulapa1Row: {
    height: 43,
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 22,
    marginRight: 16,
  },
  image1: {
    top: 0,
    left: 0,
    width: 375,
    height: 266,
    position: "absolute",
  },
  image1_imageStyle: {
    opacity: 0.4,
  },
  group: {
    width: 49,
    height: 49,
    marginTop: 58,
    marginLeft: 10,
  },
  icon2: {
    top: 3,
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button2: {
    top: 0,
    left: 0,
    width: 49,
    height: 49,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,1)",
    opacity: 0.2,
  },
  icon2Stack: {
    width: 49,
    height: 49,
  },
  rect2: {
    top: 251,
    left: 0,
    width: 375,
    height: 40,
    position: "absolute",
    backgroundColor: "rgba(250,250,250,1)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  scrollArea1: {
    top: 251,
    left: 0,
    width: 375,
    height: 501,
    position: "absolute",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  scrollArea1_contentContainerStyle: {
    height: 1010,
    width: 375,
  },
  acercaDe1: {
    color: "rgba(0,0,0,1)",
    height: 18,
    width: 84,
    marginTop: 3,
  },
  loremIpsum4: {
    color: "#121212",
    fontSize: 12,
    marginLeft: 218,
  },
  image5: {
    width: 15,
    height: 15,
  },
  acercaDe1Row: {
    height: 21,
    flexDirection: "row",
    marginTop: 14,
    marginLeft: 22,
    marginRight: 19,
  },
  loremIpsum3: {
    color: "#121212",
    textAlign: "justify",
    marginTop: 16,
    marginLeft: 22,
  },
  informacionBasica1: {
    color: "rgba(0,0,0,1)",
    height: 18,
    width: 121,
    marginTop: 27,
    marginLeft: 22,
  },
  scrollArea2: {
    width: 354,
    height: 150,
    marginTop: 17,
    marginLeft: 22,
  },
  scrollArea2_contentContainerStyle: {
    width: 2110,
    height: 150,
    flexDirection: "row",
  },
  path1: {
    width: 69,
    height: 20,
    marginLeft: 2041,
    marginTop: 1937,
  },
  basicInformation1: {
    width: 112,
    height: 147,
  },
  basicInformation2: {
    width: 112,
    height: 147,
    marginLeft: 24,
  },
  basicInformation3: {
    width: 112,
    height: 147,
    marginLeft: 24,
  },
  locationCard1: {
    height: 147,
    width: 112,
    marginLeft: 24,
  },
  basicInformation1Row: {
    height: 147,
    flexDirection: "row",
    flex: 1,
    marginRight: -166,
    marginLeft: -2110,
    marginTop: 2,
  },
  tusGuias1: {
    color: "rgba(0,0,0,1)",
    height: 18,
    width: 84,
    marginTop: 30,
    marginLeft: 22,
  },
  peopleCard1: {
    height: 122,
    width: 335,
    marginTop: 15,
    marginLeft: 22,
  },
  comentarios1: {
    color: "rgba(0,0,0,1)",
    height: 18,
    width: 84,
    marginTop: 6,
  },
  ellipse1: {
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    position: "absolute",
  },
  loremIpsum2: {
    top: 7,
    left: 5,
    position: "absolute",
    color: "#121212",
  },
  ellipse1Stack: {
    width: 30,
    height: 30,
    marginLeft: 1,
  },
  comentarios1Row: {
    height: 30,
    flexDirection: "row",
    marginTop: 18,
    marginLeft: 23,
    marginRight: 237,
  },
  commentCard1: {
    height: 74,
    width: 322,
    marginTop: 6,
    marginLeft: 31,
  },
  commentCard2: {
    width: 322,
    height: 74,
    marginTop: 22,
    marginLeft: 31,
  },
  commentCard3: {
    width: 322,
    height: 74,
    marginTop: 27,
    marginLeft: 30,
  },
  verTodos1: {
    color: "#121212",
    fontSize: 12,
    marginTop: 10,
    marginLeft: 31,
  },
  galeria1: {
    color: "rgba(0,0,0,1)",
    marginTop: 28,
    marginLeft: 23,
  },
  scrollArea3: {
    width: 353,
    height: 101,
    borderRadius: 10,
    marginTop: 17,
    marginLeft: 23,
  },
  scrollArea3_contentContainerStyle: {
    width: 357,
    height: 101,
    flexDirection: "row",
  },
  image2: {
    width: 101,
    height: 101,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
  },
  image3: {
    width: 101,
    height: 101,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginLeft: 27,
  },
  image4: {
    width: 101,
    height: 101,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginLeft: 27,
  },
  image2Row: {
    height: 101,
    flexDirection: "row",
    flex: 1,
    marginRight: -4,
  },
  rect1Stack: {
    top: 0,
    left: 0,
    width: 375,
    height: 752,
    position: "absolute",
  },
  loremIpsum1: {
    top: 314,
    left: 35,
    position: "absolute",
    color: "#121212",
  },
  rect1StackStack: {
    width: 375,
    height: 752,
    marginTop: -26,
  },
  barMenu1: {
    width: 272,
    height: 43,
    marginTop: 1,
    marginLeft: 50,
  },
});

export default DescriptionHoteles;
