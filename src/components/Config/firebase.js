import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDLncWkjsC7NkXwJnVGmHeAF4R5sOO2NnM",
  authDomain: "invoice-cmr.firebaseapp.com",
  projectId: "invoice-cmr",
  storageBucket: "invoice-cmr.appspot.com",
  messagingSenderId: "35349427564",
  appId: "1:35349427564:web:45dc5ce5903ba6c6482f49"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
