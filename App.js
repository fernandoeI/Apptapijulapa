import React from "react";
import { YellowBox } from "react-native";
import Navigation from "./app/navigation/Navigation";
import { decode, encode } from "base-64";
import BackdropProvider from "@mgcrea/react-native-backdrop-provider";

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return (
    <BackdropProvider>
      <Navigation />
    </BackdropProvider>
  );
}
