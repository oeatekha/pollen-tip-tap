// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const storageIs = getStorage(app);
