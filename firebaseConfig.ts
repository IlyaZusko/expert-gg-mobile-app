import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  // getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
export const firebaseConfig = {
  apiKey: 'AIzaSyDJ3_ySrLOjmf2LaFKV1Zpddj3crX5NLyY',
  authDomain: 'expert-gg-mobile-app.firebaseapp.com',
  projectId: 'expert-gg-mobile-app',
  storageBucket: 'expert-gg-mobile-app.appspot.com',
  messagingSenderId: '496991347931',
  appId: '1:496991347931:web:4828c22d71a9d53cb018fe',
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage();

export { app, auth, db, storage };
