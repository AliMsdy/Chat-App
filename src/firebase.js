import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZjcha8dTcSKLPSyq_uxM5-x8Kczd2XhI",
  authDomain: "chatapp-c566a.firebaseapp.com",
  projectId: "chatapp-c566a",
  storageBucket: "chatapp-c566a.appspot.com",
  messagingSenderId: "20785751851",
  appId: "1:20785751851:web:2f2baed1a1fa2687ee476e",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };
