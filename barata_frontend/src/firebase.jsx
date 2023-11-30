import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  authDomain: "chargingstation-17519.firebaseapp.com",
  projectId: "chargingstation-17519",
  storageBucket: "chargingstation-17519.appspot.com",
  messagingSenderId: "428240652591",
  appId: "1:428240652591:android:336a586a8741c2095539da"
};

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_REACT_APP_CS_CLONE_KEY,
//   authDomain: "charging-station-clone.firebaseapp.com",
//   projectId: "charging-station-clone",
//   storageBucket: "charging-station-clone.appspot.com",
//   messagingSenderId: "354037706696",
//   appId: "1:354037706696:web:9eea840ef0a819ef0f5afd"
// };

export let app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const imageFB = getStorage(app)