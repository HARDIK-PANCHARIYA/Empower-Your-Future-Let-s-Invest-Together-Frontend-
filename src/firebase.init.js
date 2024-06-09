// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyBE5KYq2mky1SBK_t5dzsHos9J2whlStWM",
//   authDomain: "frontend-f81fe.firebaseapp.com",
//   projectId: "frontend-f81fe",
//   storageBucket: "frontend-f81fe.appspot.com",
//   messagingSenderId: "376944988348",
//   appId: "1:376944988348:web:cefed7f936a3cab4c3c0b9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// export default auth;


import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAodCoGD7CUYT0LvRw1in5kBbh5fdZrqEs",
  authDomain: "empoweryourfuture-has.firebaseapp.com",
  projectId: "empoweryourfuture-has",
  storageBucket: "empoweryourfuture-has.appspot.com",
  messagingSenderId: "693791461570",
  appId: "1:693791461570:web:a968dd442fcc3a87042b5b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;