import React from "react";
import Navigation from "./app/navigation/Navigation";
import { decode, encode } from "base-64";
import BackdropProvider from "@mgcrea/react-native-backdrop-provider";

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return (
    <BackdropProvider>
      <Navigation />
    </BackdropProvider>
  );
}
