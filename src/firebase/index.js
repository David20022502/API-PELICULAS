// Firebase App (the core Firebase SDK) is always required and must be listed first
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
import firebase from "firebase/app";
import  "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDq_8eSMCyB85PXq2LGi8T0PQf-sAwkIYo",
    authDomain: "proyectoiden-960c7.firebaseapp.com",
    databaseURL: "https://proyectoiden-960c7-default-rtdb.firebaseio.com",
    projectId: "proyectoiden-960c7",
    storageBucket: "proyectoiden-960c7.appspot.com",
    messagingSenderId: "156835745778",
    appId: "1:156835745778:web:03f38c26453aa98c42656b",
    measurementId: "G-0M4GP0VPYF"
};
const app = firebase.initializeApp(firebaseConfig);
export const db = app.database;
