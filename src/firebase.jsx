import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  // apiKey: "AIzaSyCF1N1M4yBKCPQk0vD_DTOWBK2a8kSGsmo",
  authDomain: "store-tutorial-a84a9.firebaseapp.com",
  projectId: "store-tutorial-a84a9",
  storageBucket: "store-tutorial-a84a9.appspot.com",
  messagingSenderId: "206497128267",
  appId: "1:206497128267:web:0e790072bce733681492ce",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);