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
import Svg, { Path } from "react-native-svg";
import BasicInformation from "../components/BasicInformation";
import LocationCard from "../components/LocationCard";
import PeopleCard from "../components/PeopleCard";
import BarMenu from "../components/BarMenu";

function DescriptionExperience(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStackStack}>
        <View style={styles.rectStack}>
          <View style={styles.rect}>
            <Text style={styles.experiencias}>EXPERIENCIAS</Text>
            <View style={styles.capillasYSenderosRow}>
              <Text style={styles.capillasYSenderos}>Capillas y Senderos</Text>
              <View style={styles.iconStack}>
                <IoniconsIcon
                  name="ios-heart-empty"
                  style={styles.icon}
                ></IoniconsIcon>
                <TouchableOpacity style={styles.button2}></TouchableOpacity>
              </View>
            </View>
          </View>
          <ImageBackground
            source={require("../assets/images/tapijulapa.jpg")}
            resizeMode="cover"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
            <View style={styles.group1}>
              <View style={styles.icon1Stack}>
                <EntypoIcon
                  name="chevron-small-left"
                  style={styles.icon1}
                ></EntypoIcon>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={styles.button3}
                ></TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.rect2}></View>
          <View style={styles.scrollArea}>
            <ScrollView
              horizontal={false}
              contentContainerStyle={styles.scrollArea_contentContainerStyle}
            >
              <View style={styles.acercaDe1Row}>
                <Text style={styles.acercaDe1}>Acerca de</Text>
                <Text style={styles.loremIpsum2}>$200</Text>
              </View>
              <Text style={styles.loremIpsum1}>
                Lorem ipsum dolor sit amet, consectetur adipiscing {"\n"}elit.
                Mauris tincidunt enim eu lorem egestas egestas. {"\n"}Etiam
                bibendum lorem sed placerat mattis.
              </Text>
              <Text style={styles.informacionBasica1}>Información básica</Text>
              <View style={styles.scrollArea1}>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={
                    styles.scrollArea1_contentContainerStyle
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
              <Text style={styles.tusGuias}>Tus guías</Text>
              <PeopleCard style={styles.peopleCard}></PeopleCard>
              <Text style={styles.galeria1}>Galeria</Text>
              <View style={styles.scrollArea2}>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={
                    styles.scrollArea2_contentContainerStyle
                  }
                >
                  <View style={styles.image1Row}>
                    <Image
                      source={require("../assets/images/ruinas.jpg")}
                      resizeMode="cover"
                      style={styles.image1}
                    ></Image>
                    <Image
                      source={require("../assets/images/iglesia.jpg")}
                      resizeMode="cover"
                      style={styles.image2}
                    ></Image>
                    <Image
                      source={require("../assets/images/rio.jpg")}
                      resizeMode="cover"
                      style={styles.image3}
                    ></Image>
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
        <Text style={styles.loremIpsum}></Text>
      </View>
      <BarMenu style={styles.barMenu}></BarMenu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(250,250,250,1)",
  },
  rect: {
    top: 26,
    left: 0,
    width: 375,
    height: 240,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,1)",
  },
  experiencias: {
    color: "rgba(255,255,255,1)",
    letterSpacing: 2,
    fontSize: 12,
    marginTop: 151,
    marginLeft: 22,
  },
  capillasYSenderos: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 6,
  },
  icon: {
    top: 0,
    left: 2,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    height: 43,
    width: 33,
  },
  button2: {
    top: 0,
    left: 0,
    width: 40,
    height: 43,
    position: "absolute",
  },
  iconStack: {
    width: 40,
    height: 43,
    marginLeft: 88,
  },
  capillasYSenderosRow: {
    height: 43,
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 22,
    marginRight: 16,
  },
  image: {
    top: 0,
    left: 0,
    width: 375,
    height: 266,
    position: "absolute",
  },
  image_imageStyle: {
    opacity: 0.4,
  },
  group1: {
    width: 49,
    height: 49,
    marginTop: 58,
    marginLeft: 10,
  },
  icon1: {
    top: 3,
    left: 5,
    position: "absolute",
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button3: {
    top: 0,
    left: 0,
    width: 49,
    height: 49,
    position: "absolute",
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,1)",
    opacity: 0.2,
  },
  icon1Stack: {
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
  scrollArea: {
    top: 251,
    left: 0,
    width: 375,
    height: 501,
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(250,250,250,1)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  scrollArea_contentContainerStyle: {
    height: 670,
    width: 375,
  },
  acercaDe1: {
    color: "rgba(0,0,0,1)",
    height: 18,
    width: 84,
    marginTop: 2,
  },
  loremIpsum2: {
    color: "#121212",
    fontSize: 18,
    marginLeft: 205,
  },
  acercaDe1Row: {
    height: 22,
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 22,
    marginRight: 22,
  },
  loremIpsum1: {
    color: "#121212",
    textAlign: "justify",
    marginTop: 14,
    marginLeft: 22,
  },
  informacionBasica1: {
    color: "rgba(0,0,0,1)",
    height: 18,
    width: 121,
    marginTop: 27,
    marginLeft: 22,
  },
  scrollArea1: {
    width: 353,
    height: 150,
    marginTop: 17,
    marginLeft: 22,
  },
  scrollArea1_contentContainerStyle: {
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
    marginRight: -167,
    marginLeft: -2110,
    marginTop: 2,
  },
  tusGuias: {
    color: "rgba(0,0,0,1)",
    height: 18,
    width: 84,
    marginTop: 30,
    marginLeft: 22,
  },
  peopleCard: {
    height: 122,
    width: 335,
    marginTop: 15,
    marginLeft: 22,
  },
  galeria1: {
    color: "rgba(0,0,0,1)",
    marginTop: 36,
    marginLeft: 22,
  },
  scrollArea2: {
    width: 353,
    height: 101,
    borderRadius: 10,
    marginTop: 18,
    marginLeft: 22,
  },
  scrollArea2_contentContainerStyle: {
    width: 357,
    height: 101,
    flexDirection: "row",
  },
  image1: {
    width: 101,
    height: 101,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
  },
  image2: {
    width: 101,
    height: 101,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginLeft: 27,
  },
  image3: {
    width: 101,
    height: 101,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginLeft: 27,
  },
  image1Row: {
    height: 101,
    flexDirection: "row",
    flex: 1,
    marginRight: -4,
  },
  rectStack: {
    top: 0,
    left: 0,
    width: 375,
    height: 752,
    position: "absolute",
  },
  loremIpsum: {
    top: 314,
    left: 35,
    position: "absolute",
    color: "#121212",
  },
  rectStackStack: {
    width: 375,
    height: 752,
    marginTop: -26,
  },
  barMenu: {
    width: 272,
    height: 43,
    marginTop: 1,
    marginLeft: 50,
  },
});

export default DescriptionExperience;
