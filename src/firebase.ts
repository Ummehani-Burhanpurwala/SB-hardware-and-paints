import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyC363_w67DMMXrQteot1je2ej2vny7zO9w",
  authDomain: "sb-hardware-and-paints.firebaseapp.com",
  projectId: "sb-hardware-and-paints",
  storageBucket: "sb-hardware-and-paints.firebasestorage.app",
  messagingSenderId: "137527486113",
  appId: "1:137527486113:web:da6e59ff3149e7936cb2e0"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase Authentication & Firestore Database
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
