// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "agentbuilderslearning.firebaseapp.com",
  projectId: "agentbuilderslearning",
  storageBucket: "agentbuilderslearning.firebasestorage.app",
  messagingSenderId: "1083477029860",
  appId: "1:1083477029860:web:372ca5f4e46a20364a4df1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app) // it's method
const provider = new GoogleAuthProvider()

export {auth, provider}