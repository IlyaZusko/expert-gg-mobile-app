import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import { getAuth, getReactNativePersistence } from 'firebase/auth';

// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDJ3_ySrLOjmf2LaFKV1Zpddj3crX5NLyY',
  authDomain: 'expert-gg-mobile-app.firebaseapp.com',
  projectId: 'expert-gg-mobile-app',
  storageBucket: 'expert-gg-mobile-app.appspot.com',
  messagingSenderId: '496991347931',
  appId: '1:496991347931:web:4828c22d71a9d53cb018fe',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
