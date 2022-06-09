import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1dOt4rRJ4t4R6ZvNlah3DhgFVRtgNnTk",
  authDomain: "js04-b4877.firebaseapp.com",
  databaseURL: "https://js04-b4877.firebaseio.com",
  projectId: "js04-b4877",
  storageBucket: "js04-b4877.appspot.com",
  messagingSenderId: "25601932364",
  appId: "1:25601932364:web:d737e2c75d58ca3e6008e9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
