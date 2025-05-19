// firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
  storageBucket: "the-library-e6a10.appspot.com",
  messagingSenderId: "205600474541",
  appId: "1:205600474541:web:584cefb6204f73fbd48d24"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const storage = getStorage(app);

// CHỈ BẬT EMULATOR KHI PHÁT TRIỂN LOCAL
if (process.env.NODE_ENV === "development") {
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export const storageRef = (path: string) => ref(storage, path);
