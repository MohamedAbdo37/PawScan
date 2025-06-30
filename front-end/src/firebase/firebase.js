// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCle_dl8k1gHid3JBWcz4EaeFY5Y9wNndU",
  authDomain: "pawscan-9f5e8.firebaseapp.com",
  projectId: "pawscan-9f5e8",
  storageBucket: "pawscan-9f5e8.firebasestorage.app",
  messagingSenderId: "447748827637",
  appId: "1:447748827637:web:95e5035bdef621d55ed8bc",
  measurementId: "G-YMGX8BDF8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firebase Analytics
// const analytics = getAnalytics(app);