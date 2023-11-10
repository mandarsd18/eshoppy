
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY8lZrEyGt_UtUZiHXsh9dm3nOj3eAy5k",
  authDomain: "eshoppy-62e9c.firebaseapp.com",
  projectId: "eshoppy-62e9c",
  storageBucket: "eshoppy-62e9c.appspot.com",
  messagingSenderId: "395295197446",
  appId: "1:395295197446:web:822ad934d5d6e0b7493687"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb=getFirestore(app);
const auth=getAuth(app)

export {fireDb,auth}