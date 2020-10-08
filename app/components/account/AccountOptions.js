import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

import { useNavigation } from "@react-navigation/native";

export default function AccountOptions(props) {
  const { userInfo, setReloadData, toastRef, userMoreUserInfo } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);
  const navigation = useNavigation();

  let menuOptions = [];
  if (userMoreUserInfo.role === "1") {
    menuOptions = [
      {
        title: "Cambiar nombre y apellido",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambiar email",
        iconType: "material-community",
        iconNameLeft: "at",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponent("email"),
      },
      {
        title: "Cambiar contraseña",
        iconType: "material-community",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponent("password"),
      },
    ];
  } else if (userMoreUserInfo.role === "2") {
    menuOptions = [
      {
        title: "Cambiar nombre y apellido",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambiar datos de mi negocio",
        iconType: "material-community",
        iconNameLeft: "store",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () =>
          navigation.navigate("UpdateInfoRestaurant", {
            id: userMoreUserInfo.createBy,
          }),
      },
      {
        title: "Ver las reseñas de mi negocio",
        iconType: "material-community",
        iconNameLeft: "star-outline",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        // onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambiar email",
        iconType: "material-community",
        iconNameLeft: "at",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponent("email"),
      },
      {
        title: "Cambiar contraseña",
        iconType: "material-community",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponent("password"),
      },
    ];
  } else if (userMoreUserInfo.role === "3") {
    menuOptions = [
      {
        title: "Cambiar nombre y apellido",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Solicitudes para añadir negocios",
        iconType: "material-community",
        iconNameLeft: "account-star",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        // onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Agregar Lugar",
        iconType: "ionicons",
        iconNameLeft: "add-circle-outline",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => navigation.navigate("AddPlace"),
      },
      {
        title: "Agregar Experiencia",
        iconType: "ionicons",
        iconNameLeft: "add-circle-outline",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => navigation.navigate("AddExperience"),
      },
    ];
  }

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };
  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
