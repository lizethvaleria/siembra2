import firebase from "firebase/app";
import "firebase/auth";
// import 'firebase/firestore'
// import 'firebase/storage'
// import 'firebase/functions'
// import 'firebase/analyticsal'

const app = firebase.initializeApp({
  apiKey: "AIzaSyA_0uBxIXWWQ15crVdHCZ_P_mJW9VQryCQ",
  authDomain: "prueba-b9777.firebaseapp.com",
  projectId: "prueba-b9777",
  storageBucket: "prueba-b9777.appspot.com",
  messagingSenderId: "951470505272",
  appId: "1:951470505272:web:004591dc0e713e3bdbd5cd",
  measurementId: "G-20SSKY0N3G",
});

export const auth = app.auth();

// Uncomment if needed

// export const db = app.firestore();
// export const usersCollection = db.collection('users')

// export const storage = app.storage();
// export const functions = app.functions();
// export const analytics = app.analytics();
