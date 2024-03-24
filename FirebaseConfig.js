// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-Ck9ARzNx6Nj66vma1qYZMXZG9m7K35g",
  authDomain: "communityhub-303f9.firebaseapp.com",
  projectId: "communityhub-303f9",
  storageBucket: "communityhub-303f9.appspot.com",
  messagingSenderId: "594238517507",
  appId: "1:594238517507:web:7b8bf627750968f0d57936",
  measurementId: "G-1F3DXQFHQM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);