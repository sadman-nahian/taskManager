import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC3CSf453AEaVV_7R56iRG7OXVbd_s5gq0",
  authDomain: "webdevfinal-f3c9e.firebaseapp.com",
  projectId: "webdevfinal-f3c9e",
  storageBucket: "webdevfinal-f3c9e.firebasestorage.app",
  messagingSenderId: "554249279439",
  appId: "1:554249279439:web:28236749d133f0d1c224ba",
  measurementId: "G-DJHLWXPLVX"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };