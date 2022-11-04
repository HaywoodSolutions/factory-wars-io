// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRzX-5mv92Cxd4KRYvG297ArckpNW--GY",
  authDomain: "world-of-factories.firebaseapp.com",
  projectId: "world-of-factories",
  storageBucket: "world-of-factories.appspot.com",
  messagingSenderId: "306528909629",
  appId: "1:306528909629:web:f3d411f891702a6e696d54",
  measurementId: "G-3553EHK9BR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);