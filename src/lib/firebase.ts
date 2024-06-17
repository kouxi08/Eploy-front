import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApsM3RVHbsYlBR_NdkMv1QXgTyAoYK_xQ",
  authDomain: "eploy-2e770.firebaseapp.com",
  projectId: "eploy-2e770",
  storageBucket: "eploy-2e770.appspot.com",
  messagingSenderId: "788316711985",
  appId: "1:788316711985:web:9973f04a393d5379f0b910"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export default firebaseApp; // 既定エクスポート