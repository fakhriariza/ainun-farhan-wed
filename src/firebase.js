// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

// ⚠️ GANTI dengan config Firebase kamu sendiri!
const firebaseConfig = {
  apiKey: "AIzaSyCsgCCDnK4iQMFTeaY_0vWDUeYjFur5rtw",
  authDomain: "ainun-farhan-wedding.firebaseapp.com",
  projectId: "ainun-farhan-wedding",
  storageBucket: "ainun-farhan-wedding.firebasestorage.app",
  messagingSenderId: "164200061956",
  appId: "1:164200061956:web:15999fb91d5225aeaee951",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection reference
const wishesCollection = collection(db, "wishes");
const rsvpCollection = collection(db, "rsvp");

// ==========================================
// FUNGSI UNTUK WISHES (UCAPAN & DOA)
// ==========================================

// Tambah ucapan baru
export const addWish = async (wishData) => {
  try {
    const docRef = await addDoc(wishesCollection, {
      name: wishData.name,
      message: wishData.message,
      createdAt: serverTimestamp(),
    });
    console.log("Wish added with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding wish:", error);
    return { success: false, error: error.message };
  }
};

// Ambil semua ucapan (sekali)
export const getWishes = async () => {
  try {
    const q = query(wishesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const wishes = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      wishes.push({
        id: doc.id,
        name: data.name,
        message: data.message,
        date: data.createdAt
          ? formatDate(data.createdAt.toDate())
          : "Baru saja",
      });
    });
    return wishes;
  } catch (error) {
    console.error("Error getting wishes:", error);
    return [];
  }
};

// Realtime listener untuk ucapan (auto update)
export const subscribeToWishes = (callback) => {
  const q = query(wishesCollection, orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const wishes = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      wishes.push({
        id: doc.id,
        name: data.name,
        message: data.message,
        date: data.createdAt
          ? formatDate(data.createdAt.toDate())
          : "Baru saja",
      });
    });
    callback(wishes);
  });
  return unsubscribe;
};

// ==========================================
// FUNGSI UNTUK RSVP (KONFIRMASI KEHADIRAN)
// ==========================================

// Tambah RSVP baru
export const addRSVP = async (rsvpData) => {
  try {
    const docRef = await addDoc(rsvpCollection, {
      name: rsvpData.name,
      attendance: rsvpData.attendance,
      guests: rsvpData.guests,
      message: rsvpData.message,
      createdAt: serverTimestamp(),
    });
    console.log("RSVP added with ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding RSVP:", error);
    return { success: false, error: error.message };
  }
};

// Ambil semua RSVP
export const getRSVPs = async () => {
  try {
    const q = query(rsvpCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const rsvps = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      rsvps.push({
        id: doc.id,
        ...data,
        date: data.createdAt
          ? formatDate(data.createdAt.toDate())
          : "Baru saja",
      });
    });
    return rsvps;
  } catch (error) {
    console.error("Error getting RSVPs:", error);
    return [];
  }
};

// ==========================================
// HELPER FUNCTION
// ==========================================

const formatDate = (date) => {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export { db };
