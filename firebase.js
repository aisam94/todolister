// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRMOjLdsWwhD4UHA7bjOGR5lPewj2XZNs",
  authDomain: "todolister-7f7fb.firebaseapp.com",
  projectId: "todolister-7f7fb",
  storageBucket: "todolister-7f7fb.appspot.com",
  messagingSenderId: "862444838160",
  appId: "1:862444838160:web:f68fa7aaa4547db17d1995",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = !firebase.apps.length
//   ? initializeApp(firebaseConfig)
//   : firebase.app();

//
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
