import React from "react";
import { YellowBox } from "react-native";
import Navigation from "./app/navigation/Navigation";
import { firebaseApp } from "./app/utils/FireBase";
import { decode, encode } from "base-64";

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return <Navigation />;
}
