import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  // apiKey: "AIzaSyBSFoWr_xt_AvS0io8-NAyOQ_8OM7ttcyM",
  // authDomain: "fir-storagedemo-7ac69.firebaseapp.com",
  // projectId: "fir-storagedemo-7ac69",
  // storageBucket: "fir-storagedemo-7ac69.appspot.com",
  // messagingSenderId: "612151489825",
  // appId: "1:612151489825:web:a40da4200fe74525da3a60"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
