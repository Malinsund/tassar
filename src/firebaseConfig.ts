// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPpBu-_BHpkqpq-7WDWQJZgcd2rscp-0c",
  authDomain: "tassar-61824.firebaseapp.com",
  projectId: "tassar-61824",
  storageBucket: "tassar-61824.firebasestorage.app",
  messagingSenderId: "482076312668",
  appId: "1:482076312668:web:5a8c1a40321606daf41299",
  measurementId: "G-FSP81TRYM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app); 

export { analytics, auth, signInWithEmailAndPassword, signOut };
export const db = getFirestore(app);
export const storage = getStorage(app); 
