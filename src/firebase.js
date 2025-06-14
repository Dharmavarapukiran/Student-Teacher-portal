// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2DNn7O2QYV706434Xqev8k8KhBmwp4cs",
  authDomain: "student-teacher-portal-e0c27.firebaseapp.com",
  projectId: "student-teacher-portal-e0c27",
  storageBucket: "student-teacher-portal-e0c27.appspot.com",
  messagingSenderId: "352111687693",
  appId: "1:352111687693:web:6df092778261642068fd44",
  measurementId: "G-G4B3SGLRZ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export both auth and db ✅✅✅
export { auth, db };
