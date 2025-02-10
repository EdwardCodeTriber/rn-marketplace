import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByKUjeMO7CJFyUxyabcVFAJ8h3EfquYzg",
  authDomain: "employee-node-6d9ec.firebaseapp.com",
  projectId: "employee-node-6d9ec",
  storageBucket: "employee-node-6d9ec.appspot.com",
  messagingSenderId: "951749396320",
  appId: "1:951749396320:web:2a4ea0112e7a583eaf8005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };