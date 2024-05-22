import {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getDatabase} from 'firebase/database'
import {initializeAuth} from 'firebase/auth'




const firebaseConfig = {
  apiKey: "AIzaSyAHQmBz_3Zic4M3-vz7mC-qbmV_FgeGiLM",
  authDomain: "miniblog-759e9.firebaseapp.com",
  projectId: "miniblog-759e9",
  storageBucket: "miniblog-759e9.appspot.com",
  messagingSenderId: "933415799286",
  appId: "1:933415799286:web:3a14e1e77c943c3e0e1fd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =initializeAuth(app)
export const firestore = getFirestore(app);

const db = getDatabase(app) 

export {db,app};