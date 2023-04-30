import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBNmQ0mGdziTK9a6iwMmzt_wQs32z-MmxU",
  authDomain: "crud-react-33f92.firebaseapp.com",
  projectId: "crud-react-33f92",
  storageBucket: "crud-react-33f92.appspot.com",
  messagingSenderId: "870254921380",
  appId: "1:870254921380:web:6591f781bc466b9503c831"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);