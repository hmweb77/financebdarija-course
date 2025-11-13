// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMvwiwGisBH8g310XWYah_Nf1y6Z2Dw1A",
  authDomain: "financebdarija-book.firebaseapp.com",
  projectId: "financebdarija-book",
  storageBucket: "financebdarija-book.firebasestorage.app",
  messagingSenderId: "698293409166",
  appId: "1:698293409166:web:41ca93d3e4266ca7ce80df"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };