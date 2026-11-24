// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_HDdNjCB9oFt4JRTwdwdratNPMKK5ohE",
    authDomain: "data-earthquake.firebaseapp.com",
    projectId: "data-earthquake",
    storageBucket: "data-earthquake.firebasestorage.app",
    messagingSenderId: "728358213842",
    appId: "1:728358213842:web:d8e99c100ca94730edb50b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);