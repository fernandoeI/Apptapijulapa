import * as React from "react";
import { Image } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import ExperiencesScreen from "../screens/experiences/Experiences";
import HotelsScreen from "../screens/Hotels";
import PlacesScreen from "../screens/places/Places";
import RestaurantsScreen from "../screens/Restaurants";
import MyAccount from "../screens/account/MyAccount";
import Login from "../screens/account/Login";
import Register from "../screens/account/Register";
import AddPlacesScreen from "../screens/places/AddPlaces";
import AddExperiencesScreen from "../screens/experiences/AddExperiences";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ height: 45, width: 215 }}
      source={require("../../assets/img/logoTapijulapa.png")}
    />
  );
}

function ExperiencesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Experiences"
        component={ExperiencesScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: props => <LogoTitle {...props} />
        }}
      />
      <Stack.Screen
        name="AddExperiences"
        component={AddExperiencesScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: props => <LogoTitle {...props} />
        }}
      />
    </Stack.Navigator>
  );
}

function HotelsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Hotels"
        component={HotelsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: props => <LogoTitle {...props} />
        }}
      />
    </Stack.Navigator>
  );
}

function PlacesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Places"
        component={PlacesScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: props => <LogoTitle {...props} />
        }}
      />
      <Stack.Screen
        name="AddPlace"
        component={AddPlacesScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: props => <LogoTitle {...props} />
        }}
      />
    </Stack.Navigator>
  );
}

function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: props => <LogoTitle {...props} />
        }}
      />
    </Stack.Navigator>
  );
}

function MyAccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mi cuenta"
        component={MyAccount}
        options={{
          headerTitleAlign: "center",
          headerTitle: props => <LogoTitle {...props} />
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Lugares">
        <Tab.Screen
          name="Lugares"
          component={PlacesStack}
          options={{
            tabBarIcon: () => <Icon name="explore" color="#333" size={24} />
          }}
        />
        <Tab.Screen
          name="Experiencias"
          component={ExperiencesStack}
          options={{
            tabBarIcon: () => <Icon name="rowing" color="#333" size={24} />
          }}
        />
        <Tab.Screen
          name="Rutas"
          component={HotelsStack}
          options={{
            tabBarIcon: () => <Icon name="place" color="#333" size={24} />
          }}
        />

        <Tab.Screen
          name="Servicios"
          component={RestaurantsStack}
          options={{
            tabBarIcon: () => (
              <Icon name="room-service" color="#333" size={24} />
            )
          }}
        />

        <Tab.Screen
          name="Mi Cuenta"
          component={MyAccountStack}
          options={{
            tabBarIcon: () => <Icon name="person" color="#333" size={24} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
