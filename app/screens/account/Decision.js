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
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.button}
      >
        <Icon name="chevron-small-left" style={styles.icon} />
      </TouchableOpacity>
      <ScrollView
        style={styles.viewBody}
        centerContent={true}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../../assets/images/undraw_trip_dv9f.png")}
          style={styles.image}
          resizeMode="cover"
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
    </>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: 250,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  viewBtn: {
    flex: 1,
    alignItems: "center",
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
    marginTop: 45,
    marginLeft: 10,
  },
});
