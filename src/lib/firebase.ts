
      
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "dotenv/config";

const firebaseConfig = {
  apiKey: "AIzaSyAoioWUREDPmwLaZzjFqKzs0hfq_VfzWhM",
  authDomain: "studio-9852301761-76ee4.firebaseapp.com",
  projectId: "studio-9852301761-76ee4",
  storageBucket: "studio-9852301761-76ee4.appspot.com",
  messagingSenderId: "211779146745",
  appId: "1:211779146745:web:e9f9ecac8afa545c76a328"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

    