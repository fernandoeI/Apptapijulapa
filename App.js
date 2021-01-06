import React from "react";
import { LogBox } from "react-native";
import Navigation from "./app/navigation/Navigation";
import { decode, encode } from "base-64";
import BackdropProvider from "@mgcrea/react-native-backdrop-provider";

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <BackdropProvider>
      <Navigation />
    </BackdropProvider>
  );
}
