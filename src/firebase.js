// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAumVBXA7ArqsrfnKnkuNBKcF0ijG85rTc",
  authDomain: "edumentor-8ec1b.firebaseapp.com",
  projectId: "edumentor-8ec1b",
  storageBucket: "edumentor-8ec1b.appspot.com",
  messagingSenderId: "293598432232",
  appId: "1:293598432232:web:4e7ade1fa61f933132725d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ Firestore enabled
