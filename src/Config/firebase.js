import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCLxAdhKE_-MGU1274xVEhRBg8U8tXlz40",
    authDomain: "fs-rifa.firebaseapp.com",
    databaseURL: "https://fs-rifa.firebaseio.com",
    projectId: "fs-rifa",
    storageBucket: "fs-rifa.appspot.com",
    messagingSenderId: "1024562608922",
    appId: "1:1024562608922:web:6bc1ea4e2987d8c92d0aa3",
    measurementId: "G-3VQPW5HZDB"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
}

const db = firebase.firestore();

firebase.db = db;
firebase.auth = firebase.auth();

export default firebase;