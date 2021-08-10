import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBgBE7HMyZyIj0I-SbxUZWEKAm2BFcKWsw",
  authDomain: "struggle-for-greece-4f90c.firebaseapp.com",
  databaseURL: "https://struggle-for-greece-4f90c-default-rtdb.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
