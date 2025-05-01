// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRvc-n-mFO0Qa7JSqbpHq_fv0GIvFkH4w",
  authDomain: "cleanest-fade-barbershop-app.firebaseapp.com",
  databaseURL: "https://cleanest-fade-barbershop-app-default-rtdb.firebaseio.com",
  projectId: "cleanest-fade-barbershop-app",
  storageBucket: "cleanest-fade-barbershop-app.firebasestorage.app",
  messagingSenderId: "432378197386",
  appId: "1:432378197386:web:422309c61a18cd90608473",
  measurementId: "G-FH055EDYQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };