// import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXAJHDfgbmqbq0rBU4GnSGSkRWP0wcIEI",
  authDomain: "final-project-7d4ae.firebaseapp.com",
  projectId: "final-project-7d4ae",
  storageBucket: "final-project-7d4ae.appspot.com",
  messagingSenderId: "560006731201",
  appId: "1:560006731201:web:7ad16cebe7a64470c00b40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore();
// export const fs = firebase