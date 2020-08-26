import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyClTMbpkx6zyQyPRWLYRfUANlQ5i0lUbE8",
  authDomain: "whatsapp-clone-71319.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-71319.firebaseio.com",
  projectId: "whatsapp-clone-71319",
  storageBucket: "whatsapp-clone-71319.appspot.com",
  messagingSenderId: "72309785325",
  appId: "1:72309785325:web:092987ffa08959fb7182e4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;