import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import GoButton from "../../components/GoButton";

import Icon from "react-native-vector-icons/Entypo";

export default function Decision(props) {
  return (
    <>
      <ScrollView
        style={styles.viewBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/undraw_trip_dv9f.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Selecciona lo que mejor te describa</Text>

        <View style={styles.viewBtn}>
          <GoButton
            screenName="Login"
            title="Soy un Prestador de Servicio"
            type="2"
          />
        </View>
        <View style={styles.viewBtn}>
          <GoButton screenName="Login" title="Soy un Turista" type="1" />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.button}
      >
        <Icon name="chevron-small-left" style={styles.icon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: 210,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  viewBtn: {
    marginTop: 10,
  },
  iconStack: {
    width: 49,
    height: 49,
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
  },
  button: {
    position: "absolute",
    marginTop: 45,
    marginLeft: 10,
  },
});
