import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEsdIauDdfuAdJpQr_LbFTllwgXUx-agE",
  authDomain: "login-shop-8df20.firebaseapp.com",
  projectId: "login-shop-8df20",
  storageBucket: "login-shop-8df20.appspot.com",
  messagingSenderId: "928862903760",
  appId: "1:928862903760:web:e306ead252a309f8022dd5",
  measurementId: "G-3SCMWJPV46",
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
