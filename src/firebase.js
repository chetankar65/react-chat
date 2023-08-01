import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBHvcSjJHOhr0RTgrws-roJzETeqlVEBsk",
  authDomain: "chat-632c9.firebaseapp.com",
  projectId: "chat-632c9",
  storageBucket: "chat-632c9.appspot.com",
  messagingSenderId: "776239008183",
  appId: "1:776239008183:web:eb5d0d253c1dc175a68032"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()
