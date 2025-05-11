// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQshuHO8D4JWfZhwXn27-twU69V6fuKIA",
    authDomain: "tyt-ayt-tracker.firebaseapp.com",
    projectId: "tyt-ayt-tracker",
    storageBucket: "tyt-ayt-tracker.firebasestorage.app",
    messagingSenderId: "532079286264",
    appId: "1:532079286264:web:965ce2a6679ed5089d280d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getProgress = async () => {
  const docRef = doc(db, "progress", "tyt-ayt");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const setProgress = async (data) => {
  const docRef = doc(db, "progress", "tyt-ayt");
  await setDoc(docRef, data);
};

export const getLessonProgress = async (exam, lesson) => {
  const docId = `${exam.toLowerCase()}-${lesson.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const docRef = doc(db, "progress", docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().subjects;
  } else {
    return null;
  }
};

export const setLessonProgress = async (exam, lesson, subjects) => {
  const docId = `${exam.toLowerCase()}-${lesson.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const docRef = doc(db, "progress", docId);
  await setDoc(docRef, { subjects });
};

export { db };