import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
  storageBucket: "the-library-12544.firebasestorage.app",
  messagingSenderId: "1088612563725",
  appId: "1:1088612563725:web:1998d1bdd901e70d70ce44",
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const storage = getStorage(app);
export const storageRef = (token: string) => ref(storage, token);
