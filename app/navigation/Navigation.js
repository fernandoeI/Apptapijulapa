import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Entypo";
import Home from "../screens/Home";
import RestaurantsScreen from "../screens/Restaurants";
import MyAccount from "../screens/account/MyAccount";
import Login from "../screens/account/Login";
import Register from "../screens/account/Register";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import HotelsScreen from "../screens/Hotels";
import AddPlace from "../screens/places/AddPlaces";
import DescriptionScreen from "../screens/Description";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
      <Stack.Screen name="Hotels" component={HotelsScreen} />
      <Stack.Screen name="AddPlace" component={AddPlace} />
      <Stack.Screen name="Place" component={DescriptionScreen} />
    </Stack.Navigator>
  );
}

function Favorites() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Favorites" component={DescriptionScreen} />
    </Stack.Navigator>
  );
}

function MyAccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Mi cuenta" component={MyAccount} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Inicio" style={styles.containerMenu}>
        <Tab.Screen
          name="Inicio"
          component={HomeStack}
          options={{
            tabBarIcon: () => <Icon name="home" style={styles.icon} />,
          }}
        />

        <Tab.Screen
          name="Favoritos"
          component={Favorites}
          options={{
            tabBarIcon: () => (
              <IoniconsIcon name="md-heart" style={styles.icon} />
            ),
          }}
        />

        <Tab.Screen
          name="Mi Cuenta"
          component={MyAccountStack}
          options={{
            tabBarIcon: () => (
              <IoniconsIcon name="md-person" style={styles.icon} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerMenu: {
    backgroundColor: "#FAFAFA",
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 24,
  },
});
