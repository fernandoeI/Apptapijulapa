import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

export default function Emergency(props) {
  const phoneNumber = [
    "911",
    "074",
    "078",
    "53 95 11 11",
    "932 100 8617",
    "56 83 22 22",
    "089",
    "55 54 06 12",
    "088",
    "56 54 32 10",
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          width: "80%",
          marginLeft: 35,
        }}
      >
        <Text style={styles.services}>Lineas de Emergencias</Text>
      </View>
      <ScrollView>
        <View style={styles.cardServiceRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[0]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[0]}</Text>
            <Text style={styles.textCard}>Emergencias</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[1]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[1]}</Text>
            <Text style={styles.textCard}>Capufe</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardServiceRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[2]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[2]}</Text>
            <Text style={styles.textCard}>Ángeles Verdes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[3]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[3]}</Text>
            <Text style={styles.textCard}>Cruz Roja</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardServiceRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[4]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[4]}</Text>
            <Text style={styles.textCard}>Comité del Pueblo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[5]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[5]}</Text>
            <Text style={styles.textCard}>Protección Civil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardServiceRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[6]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[6]}</Text>
            <Text style={styles.textCard}>Denuncia Anónima</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[7]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[7]}</Text>
            <Text style={styles.textCard}>Incendios Forestales</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardServiceRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[8]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[8]}</Text>
            <Text style={styles.textCard}>Policia Federal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phoneNumber[9]}`)}
            style={styles.cardService}
          >
            <Text style={styles.text}>{phoneNumber[9]}</Text>
            <Text style={styles.textCard}>Fuga de Agua</Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  icon: {
    color: "rgba(32,14,50,1)",
    fontSize: 32,
  },
  services: {
    color: "rgba(0,0,0,1)",
    fontSize: 26,
    marginTop: 45,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardServiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 30,
  },
  cardService: {
    width: "47%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    paddingBottom: 30,
    paddingTop: 30,
    marginLeft: 15,
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    color: "black",
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
  textCard: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
