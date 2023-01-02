// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBgQZE081wA3U5q40vNAzSRyrvGXsrxdtg",
  authDomain: "pollen-rich-media.firebaseapp.com",
  projectId: "pollen-rich-media",
  storageBucket: "pollen-rich-media.appspot.com",
  messagingSenderId: "813527298305",
  appId: "1:813527298305:web:a6009e2043a31ec7ddeb00",
  measurementId: "G-LF8L9ZDP39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storageIs = getStorage(app);
const analytics = getAnalytics(app);

export {database, storageIs};

