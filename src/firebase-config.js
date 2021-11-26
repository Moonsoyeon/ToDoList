import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_PEyemPINNuBp3okakVOgJccu3n4jR_g",
  authDomain: "todo-240f8.firebaseapp.com",
  projectId: "todo-240f8",
  storageBucket: "todo-240f8.appspot.com",
  messagingSenderId: "571705443443",
  appId: "1:571705443443:web:7c3aa1c2950e5b58371606",
  measurementId: "G-J5YETHMHDK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
