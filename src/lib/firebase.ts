
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "studio-9852301761-76ee4",
  appId: "1:211779146745:web:e9f9ecac8afa545c76a328",
  storageBucket: "studio-9852301761-76ee4.firebasestorage.app",
  apiKey: "AIzaSyAoioWUREDPmwLaZzjFqKzs0hfq_VfzWhM",
  authDomain: "studio-9852301761-76ee4.firebaseapp.com",
  messagingSenderId: "211779146745",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
