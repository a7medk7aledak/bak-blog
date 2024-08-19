// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "bak-blog.firebaseapp.com",
  projectId: "bak-blog",
  storageBucket: "bak-blog.appspot.com",
  messagingSenderId: "506312862319",
  appId: "1:506312862319:web:e9ea593fe09c5f5add3b9a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
