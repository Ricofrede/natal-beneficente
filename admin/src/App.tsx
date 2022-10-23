import {
  FirebaseCMSApp
} from "@camberi/firecms";

import collections from './collections'
import useAuthenticator from "./hooks/useAuthenticator";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

const firebaseConfig = {
  apiKey: "AIzaSyC2qC_xO5gg9nECL-iInkTbj0-x94tmZIQ",
  authDomain: "natal-beneficente.firebaseapp.com",
  projectId: "natal-beneficente",
  storageBucket: "natal-beneficente.appspot.com",
  messagingSenderId: "615578786558",
  appId: "1:615578786558:web:31a83b4a75f5dcca5c23af"
};


export default function App() {
  const myAuthenticator = useAuthenticator()

  return <FirebaseCMSApp
    name={"Natal Beneficente"}
    authentication={myAuthenticator}
    collections={collections}
    firebaseConfig={firebaseConfig}
  />;
}
