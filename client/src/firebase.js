import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtq4CVAhQk2220J0h9SeXs-Clj_KveGtw",
  authDomain: "shot-mate.firebaseapp.com",
  projectId: "shot-mate",
  storageBucket: "shot-mate.firebasestorage.app",
  messagingSenderId: "484511301813",
  appId: "1:484511301813:web:d4042c36ea369b74bebefc",
  measurementId: "G-DW54Z6DKMB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
