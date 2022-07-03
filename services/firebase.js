import firebase from "firebase";

// const config = {
//   apiKey: "AIzaSyBMVBTzfaGe78TIRiGFnugvzWR0dR6l21c",
//   authDomain: "karigarbabu-388d9.firebaseapp.com",
//   projectId: "karigarbabu-388d9",
//   storageBucket: "karigarbabu-388d9.appspot.com",
//   messagingSenderId: "368220512203",
//   appId: "1:368220512203:web:9d1c3f1a922490d975204e",
// };

// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMVBTzfaGe78TIRiGFnugvzWR0dR6l21c",
  authDomain: "karigarbabu-388d9.firebaseapp.com",
  projectId: "karigarbabu-388d9",
  storageBucket: "karigarbabu-388d9.appspot.com",
  messagingSenderId: "368220512203",
  appId: "1:368220512203:web:9d1c3f1a922490d975204e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
