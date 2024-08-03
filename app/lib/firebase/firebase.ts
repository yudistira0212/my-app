// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzqz41FUcdQ7GMdVGToAVprWu8vWBhvqM",
  authDomain: "project2-16a18.firebaseapp.com",
  databaseURL: "https://project2-16a18-default-rtdb.firebaseio.com",
  projectId: "project2-16a18",
  storageBucket: "project2-16a18.appspot.com",
  messagingSenderId: "817689119161",
  appId: "1:817689119161:web:ad3f2104c1e155a9974e68",
  measurementId: "G-8VVEF2WRQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
