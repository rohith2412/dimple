import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD5gtYo3XAwnLcMRwX6ic_v_o7f1xKe18",
  authDomain: "dimple-message.firebaseapp.com",
  projectId: "dimple-message",
  storageBucket: "dimple-message.firebasestorage.app",
  messagingSenderId: "679030324064",
  appId: "1:679030324064:web:82121864993667135ffc05",
  measurementId: "G-277EZEG4BY",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);

