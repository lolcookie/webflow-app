import * as firebase from "firebase";
import { DataMessage } from "../../functions/src/data-types";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBkGCaR4THqRD436j8MHlkzCvdWRuCuIdw",
  authDomain: "webflow-test-d003b.firebaseapp.com",
  databaseURL: "https://webflow-test-d003b.firebaseio.com",
  projectId: "webflow-test-d003b",
  storageBucket: "webflow-test-d003b.appspot.com",
  messagingSenderId: "749203036509",
  appId: "1:749203036509:web:57e8576d77dc576996b0b4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

//@ts-ignore
loginbtn.addEventListener("click", function() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //@ts-ignore
      var token = result.credential.accessToken;
      // The signed-in user info.
      //   var user = result.user;
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   // The email of the user's account used.
      //   var email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   var credential = error.credential;
      // ...
    });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("loginbtn").style.display = "none";
    document.getElementById("logoutbtn").style.display = "inline-block";

    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    console.log(user);
    // ...
  } else {
    document.getElementById("loginbtn").style.display = "inline-block";
    document.getElementById("logoutbtn").style.display = "none";
    // User is signed out.
    // ...
  }
});
//@ts-ignore
logoutbtn.addEventListener("click", function() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
});
var db = firebase.firestore();

//@ts-ignore
sendmessagebtn.addEventListener("click", sendMessage);

function sendMessage(event) {
  event.preventDefault();
  //@ts-ignore
  var val = document.getElementById("myInput").value;
  var user = firebase.auth().currentUser;
  //@ts-ignore
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
  }
  db.collection("messages")
    .add({
      content: val,
      created_by: uid,
      created_at: new Date()
    } as DataMessage)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

db.collection("messages")
  .doc("SF")
  .onSnapshot(function(doc) {
    console.log("Current data: ", doc.data());
  });
