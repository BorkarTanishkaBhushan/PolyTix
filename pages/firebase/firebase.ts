// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8B2PUv-fb0dU3a0PZSpRsHRuf_1LSptc",
  authDomain: "kjsce7point0hackathon.firebaseapp.com",
  projectId: "kjsce7point0hackathon",
  storageBucket: "kjsce7point0hackathon.appspot.com",
  messagingSenderId: "1026732682418",
  appId: "1:1026732682418:web:ecc3f03e5fe233ce81edab",
  measurementId: "G-6SMP9LF7MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app)

export const initFirebase = () => {
  return app;
};
