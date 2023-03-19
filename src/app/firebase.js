// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "VARIABLEDEENTORNO",
  authDomain: "VARIABLEDEENTORNO",
  projectId: "VARIABLEDEENTORNO",
  storageBucket: "VARIABLEDEENTORNO",
  messagingSenderId: "VARIABLEDEENTORNO",
  appId: "VARIABLEDEENTORNO",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
