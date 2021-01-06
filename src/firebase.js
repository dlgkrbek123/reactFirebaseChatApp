import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU8rBrwh7OmU80gtlm8ir78s1OkX-1lvU",
  authDomain: "react-firebase-chat-app-bfdbf.firebaseapp.com",
  projectId: "react-firebase-chat-app-bfdbf",
  storageBucket: "react-firebase-chat-app-bfdbf.appspot.com",
  messagingSenderId: "958537234916",
  appId: "1:958537234916:web:dce2d8ab58fa7e276aeff1",
  measurementId: "G-CZDXB3C81C",
};

firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
