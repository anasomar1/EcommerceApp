import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBf0IzRzNBuokDxWHser5QmsqV8gc66WaM",
  authDomain: "ecommerce-38d5e.firebaseapp.com",
  projectId: "ecommerce-38d5e",
  storageBucket: "ecommerce-38d5e.appspot.com",
  messagingSenderId: "696223470939",
  appId: "1:696223470939:web:8d002afd2ed57b4164f67e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
