import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const  { firebaseConfig } = require('../config/firebaseConfig')


firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()

const auth = firebase.auth()

const storageRef = firebase.storage().ref()

const catalogReference = db.collection("catalog")


export {
    db,
    catalogReference,
    storageRef,
    auth
}