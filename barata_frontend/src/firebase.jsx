import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseKey = import.meta.env.VITE_REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "chargingstation-17519.firebaseapp.com",
  projectId: "chargingstation-17519",
  storageBucket: "chargingstation-17519.appspot.com",
  messagingSenderId: "428240652591",
  appId: "1:428240652591:android:336a586a8741c2095539da"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth()