import firebase from 'firebase'
import 'firebase/firestore'
import { KEYS_FIREBASE } from '../keys'

// Initialize Firebase
firebase.initializeApp(KEYS_FIREBASE);

const db = firebase.firestore()

export default {
  firebase,
  db
}
