import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBF9Hv3qrhTLjDa9p6J48q6o2ixUvFEW9E",
  authDomain: "note-demo-a139e.firebaseapp.com",
  projectId: "note-demo-a139e",
  storageBucket: "note-demo-a139e.appspot.com",
  messagingSenderId: "759346639968",
  appId: "1:759346639968:web:05231fc2d835a75ca57f05"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth=getAuth(app)