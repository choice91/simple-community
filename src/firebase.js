import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD17LJuZeZCQbRPUA2T-xBbMOj45XLfi6E",
  authDomain: "notice-board-99976.firebaseapp.com",
  projectId: "notice-board-99976",
  storageBucket: "notice-board-99976.appspot.com",
  messagingSenderId: "608320196604",
  appId: "1:608320196604:web:bd53b25f7c33a6e9c6ec79",
  measurementId: "G-FSK3R9CMTV",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
