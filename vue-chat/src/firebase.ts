import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYxfvw2vCUzHNeAp9Wy_yG9uJa8BSA_oc",
  authDomain: "chatapp-fff12.firebaseapp.com",
  projectId: "chatapp-fff12",
  storageBucket: "chatapp-fff12.appspot.com",
  messagingSenderId: "754405013773",
  appId: "1:754405013773:web:cf654fc57438d178ef1844",
  measurementId: "G-QSSSMK5EGK",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
