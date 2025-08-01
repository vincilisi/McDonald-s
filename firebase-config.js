// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDC3mqAyp3UgCgPTIrOU0bWX5MoTmtmtck",
    authDomain: "mcdonald-s-88321.firebaseapp.com",
    projectId: "mcdonald-s-88321",
    storageBucket: "mcdonald-s-88321.firebasestorage.app",
    messagingSenderId: "176448598989",
    appId: "1:176448598989:web:a64667bb39d9e43e90ca84",
    measurementId: "G-3JK2M5TFWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);