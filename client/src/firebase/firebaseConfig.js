import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQJNnjIowTHIUphV8BEzCrALrjTzKiwe8",
  authDomain: "realtime-meeting-app-f289b.firebaseapp.com",
  projectId: "realtime-meeting-app-f289b",
  storageBucket: "realtime-meeting-app-f289b.firebasestorage.app",
  messagingSenderId: "852451317806",
  appId: "1:852451317806:web:84fd9f8748737cd6c227bf",
  measurementId: "G-CRK89XLMGC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);