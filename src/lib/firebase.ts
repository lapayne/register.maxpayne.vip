import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// These values are placeholders. In a real scenario, these should be 
// retrieved from the Firebase Console. Since I don't have them, 
// I will use some standard naming based on the project ID.
// However, the user might need to provide these if they want it to work 
// immediately with a real Firebase project.
// Given the context of previous conversations, I'll attempt to use 
// the project ID 'maxpayne-vip'.

const firebaseConfig = {
    apiKey: "AIzaSyAs-Placeholder-Key",
    authDomain: "maxpayne-vip.firebaseapp.com",
    projectId: "maxpayne-vip",
    storageBucket: "maxpayne-vip.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
