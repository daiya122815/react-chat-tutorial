export default async () => {
    const data = {
        message: "Hello, World!",
    };
    return new Response(JSON.stringify(data));
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_hKg0ACgm7Pv3zohnK4HYA9pDvmnxURw",
  authDomain: "react-chat-tutorial-35c0d.firebaseapp.com",
  projectId: "react-chat-tutorial-35c0d",
  storageBucket: "react-chat-tutorial-35c0d.firebasestorage.app",
  messagingSenderId: "382263524976",
  appId: "1:382263524976:web:224fc8c3ec7c1b7845beb5",
  measurementId: "G-K601LJ9S0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);