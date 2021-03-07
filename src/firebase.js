import firebase from "firebase";
import "@firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCYJ0omOR75kzRG_p-LrvsVyWVoONSwrEY",
    authDomain: "kaoutarreactapp.firebaseapp.com",
    projectId: "kaoutarreactapp",
    storageBucket: "kaoutarreactapp.appspot.com",
    messagingSenderId: "940830143408",
    appId: "1:940830143408:web:6a6151341d3fa169761c75"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase ;