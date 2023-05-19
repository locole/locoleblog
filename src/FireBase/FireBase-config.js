// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfv_S1KGi24GLQFIkp-3Ark5Ht4sBm2YQ",
  authDomain: "my-blog-50bf8.firebaseapp.com",
  projectId: "my-blog-50bf8",
  storageBucket: "my-blog-50bf8.appspot.com",
  messagingSenderId: "531348446652",
  appId: "1:531348446652:web:9e1d67ba0e6783f5e75fb9",
  measurementId: "G-ZQM3W04L7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);