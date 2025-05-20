// import {
//     getApps,
//     initializeApp
// } from 'firebase/app'
// import {
//     getStorage, ref
// } from 'firebase/storage'

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASEAPIKEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASEAUTHDOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASEPROJECTID,
//     storageBucket: "the-library-12544.firebasestorage.app",
//     messagingSenderId: "1088612563725",
//     appId: "1:1088612563725:web:1998d1bdd901e70d70ce44"
//   };
// // const firebaseConfig = {
// //     apiKey: "AIzaSyDmnXMYCie2RefG3ToD0n142a0YamEbWmK",
// //     authDomain: "the-library-12544.firebaseapp.com",
// //     projectId: "the-library-12544",
// //     storageBucket: "the-library-12544.firebasestorage.app",
// //     messagingSenderId: "1088612563725",
// //     appId: "1:1088612563725:web:1998d1bdd901e70d70ce44"
// //   };
//   const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

//   const storage = getStorage(app)
//   export const storageRef = (token: string) => ref(storage, token)

import {
  getApps,
  initializeApp
} from 'firebase/app'

import {
  getStorage,
  ref,
  connectStorageEmulator
} from 'firebase/storage'

// Cấu hình giả, bạn có thể giữ nguyên hoặc dùng biến môi trường giả
const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "localhost",
  projectId: "demo-project", // phải trùng với projectId emulator khởi tạo
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "fake-sender-id",
  appId: "fake-app-id"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

const storage = getStorage(app)

connectStorageEmulator(storage, "127.0.0.1", 9199)

export const storageRef = (token: string) => ref(storage, token)
