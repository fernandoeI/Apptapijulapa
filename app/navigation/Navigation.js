import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import IoniconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import MyAccount from "../screens/account/MyAccount";
import Login from "../screens/account/Login";
import Register from "../screens/account/Register";
import Decision from "../screens/account/Decision";
import AddPlace from "../screens/places/AddPlaces";
import AddExperience from "../screens/experiences/AddExperience";

import DescriptionScreen from "../screens/places/Description";
import AddReviewPlace from "../screens/places/AddReviewPlace";
import AllReviewsPlace from "../screens/places/AllReviewsPlace";
import AllPlaces from "../screens/places/AllPlaces";

import DescriptionExperienceScreen from "../screens/experiences/DescriptionExperience";
import AddReviewExperience from "../screens/experiences/AddReviewExperience";
import AllReviewsExperience from "../screens/experiences/AllReviewsExperience";
import AllExperiences from "../screens/experiences/AllExperiences";

import FavoritesScreen from "../screens/Favorites";

import RestaurantsScreen from "../screens/restaurants/Restaurants";
import UpdateInfoRestaurant from "../screens/restaurants/AddExperience";
import DescriptionRestaurantScreen from "../screens/restaurants/DescriptionExperience";
import AddReviewRestaurant from "../screens/restaurants/AddReviewExperience";
import AllReviewsRestaurant from "../screens/restaurants/AllReviewsExperience";

import ArtesaniasScreen from "../screens/artesanos/Artesanias";
import UpdateInfoArtesania from "../screens/artesanos/AddExperience";
import DescriptionArtesaniaScreen from "../screens/artesanos/DescriptionExperience";
import AddReviewArtesania from "../screens/artesanos/AddReviewExperience";
import AllReviewsArtesania from "../screens/artesanos/AllReviewsExperience";

import HotelsScreen from "../screens/hotels/Hotels";
import UpdateInfoHotel from "../screens/hotels/AddExperience";
import DescriptionHotelScreen from "../screens/hotels/DescriptionExperience";
import AddReviewHotel from "../screens/hotels/AddReviewExperience";
import AllReviewsHotel from "../screens/hotels/AllReviewsExperience";

import GuiasScreen from "../screens/guias/Guias";
import UpdateInfoGuia from "../screens/guias/AddExperience";
import DescriptionGuiaScreen from "../screens/guias/DescriptionExperience";
import AddReviewGuia from "../screens/guias/AddReviewExperience";
import AllReviewsGuia from "../screens/guias/AllReviewsExperience";

import MiscelaneaScreen from "../screens/miscelaneas/Miscelaneas";
import UpdateInfoMiscelanea from "../screens/miscelaneas/AddExperience";
import DescriptionMiscelaneaScreen from "../screens/miscelaneas/DescriptionExperience";
import AddReviewMiscelanea from "../screens/miscelaneas/AddReviewExperience";
import AllReviewsMiscelanea from "../screens/miscelaneas/AllReviewsExperience";

import OthersScreen from "../screens/others/Others";
import UpdateInfoOther from "../screens/others/AddExperience";
import DescriptionOtherScreen from "../screens/others/DescriptionExperience";
import AddReviewOther from "../screens/others/AddReviewExperience";
import AllReviewsOther from "../screens/others/AllReviewsExperience";

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
      <Stack.Screen name="Place" component={DescriptionScreen} />
      <Stack.Screen name="AddReviewPlace" component={AddReviewPlace} />
      <Stack.Screen name="AllReviewsPlace" component={AllReviewsPlace} />
      <Stack.Screen name="AllPlaces" component={AllPlaces} />
      <Stack.Screen name="Experience" component={DescriptionExperienceScreen} />

      <Stack.Screen
        name="AddReviewExperience"
        component={AddReviewExperience}
      />
      <Stack.Screen
        name="AllReviewsExperience"
        component={AllReviewsExperience}
      />
      <Stack.Screen name="AllExperiences" component={AllExperiences} />

      <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
      <Stack.Screen
        name="UpdateInfoRestaurant"
        component={UpdateInfoRestaurant}
      />
      <Stack.Screen
        name="DescriptionRestaurantScreen"
        component={DescriptionRestaurantScreen}
      />
      <Stack.Screen
        name="AddReviewRestaurant"
        component={AddReviewRestaurant}
      />
      <Stack.Screen
        name="AllReviewsRestaurant"
        component={AllReviewsRestaurant}
      />
      <Stack.Screen name="Artesanias" component={ArtesaniasScreen} />
      <Stack.Screen
        name="UpdateInfoArtesania"
        component={UpdateInfoArtesania}
      />
      <Stack.Screen
        name="DescriptionArtesaniaScreen"
        component={DescriptionArtesaniaScreen}
      />
      <Stack.Screen name="AddReviewArtesania" component={AddReviewArtesania} />
      <Stack.Screen
        name="AllReviewsArtesania"
        component={AllReviewsArtesania}
      />

      <Stack.Screen name="Hotels" component={HotelsScreen} />
      <Stack.Screen name="UpdateInfoHotel" component={UpdateInfoHotel} />
      <Stack.Screen
        name="DescriptionHotelScreen"
        component={DescriptionHotelScreen}
      />
      <Stack.Screen name="AddReviewHotel" component={AddReviewHotel} />
      <Stack.Screen name="AllReviewsHotel" component={AllReviewsHotel} />

      <Stack.Screen name="Guias" component={GuiasScreen} />
      <Stack.Screen name="UpdateInfoGuia" component={UpdateInfoGuia} />
      <Stack.Screen
        name="DescriptionGuiaScreen"
        component={DescriptionGuiaScreen}
      />
      <Stack.Screen name="AddReviewGuia" component={AddReviewGuia} />
      <Stack.Screen name="AllReviewsGuia" component={AllReviewsGuia} />

      <Stack.Screen name="Miscelanea" component={MiscelaneaScreen} />
      <Stack.Screen
        name="UpdateInfoMiscelanea"
        component={UpdateInfoMiscelanea}
      />
      <Stack.Screen
        name="DescriptionMiscelaneaScreen"
        component={DescriptionMiscelaneaScreen}
      />
      <Stack.Screen
        name="AddReviewMiscelanea"
        component={AddReviewMiscelanea}
      />
      <Stack.Screen
        name="AllReviewsMiscelanea"
        component={AllReviewsMiscelanea}
      />

      <Stack.Screen name="Otros" component={OthersScreen} />
      <Stack.Screen name="UpdateInfoOther" component={UpdateInfoOther} />
      <Stack.Screen
        name="DescriptionOtherScreen"
        component={DescriptionOtherScreen}
      />
      <Stack.Screen name="AddReviewOther" component={AddReviewOther} />
      <Stack.Screen name="AllReviewsOther" component={AllReviewsOther} />
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
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
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
      <Stack.Screen name="Decision" component={Decision} />

      <Stack.Screen name="AddPlace" component={AddPlace} />
      <Stack.Screen name="AddExperience" component={AddExperience} />
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
            tabBarIcon: () => (
              <IoniconsIcon name="home-outline" style={styles.icon} />
            ),
          }}
        />

        <Tab.Screen
          name="Favoritos"
          component={Favorites}
          options={{
            tabBarIcon: () => (
              <IoniconsIcon name="heart-outline" style={styles.icon} type />
            ),
          }}
        />

        <Tab.Screen
          name="Mi Cuenta"
          component={MyAccountStack}
          options={{
            tabBarIcon: () => (
              <IoniconsIcon name="account-outline" style={styles.icon} />
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
