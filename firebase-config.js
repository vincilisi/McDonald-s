// src/firebase-config.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Import necessario

const firebaseConfig = {
    apiKey: "AIzaSyDC3mqAyp3UgCgPTIrOU0bWX5MoTmtmtck",
    authDomain: "mcdonald-s-88321.firebaseapp.com",
    projectId: "mcdonald-s-88321",
    storageBucket: "mcdonald-s-88321.appspot.com", // ✅ correggi ".app" → ".appspot.com"
    messagingSenderId: "176448598989",
    appId: "1:176448598989:web:a64667bb39d9e43e90ca84",
    measurementId: "G-3JK2M5TFWP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ Ora funzionerà!

export { app, auth, analytics };
