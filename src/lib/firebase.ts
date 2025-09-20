
      
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "dotenv/config";

const firebaseConfig = {
  "projectId": "dentisystems-web-2563348-a6782",
  "appId": "1:160995012293:web:36d94943650eecf38f0aac",
  "apiKey": "AIzaSyCAzmJ5KkE8dmVF4GmehDs0Y1VG2L7w6zc",
  "authDomain": "dentisystems-web-2563348-a6782.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "160995012293"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

    