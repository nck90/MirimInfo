import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

let db: Firestore | null = null;
let auth: Auth | null = null;
let isInitialized = false;

// Firebase 초기화 함수
export async function initializeFirebase() {
  if (!isInitialized) {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);  // Firestore 인스턴스 할당
    auth = getAuth(app);    // Auth 인스턴스 할당
    isInitialized = true;
    console.log('Firebase 초기화 완료');
  }
}

// Firestore 인스턴스를 반환하는 함수
export async function getFirestoreInstance() {
  if (!isInitialized) {
    await initializeFirebase();  // 초기화가 안 되어 있으면 초기화 후 Firestore 인스턴스 반환
  }
  if (!db) {
    throw new Error('Firestore 인스턴스가 없습니다.');
  }
  return db;
}

// Auth 인스턴스를 반환하는 함수
export async function getAuthInstance() {
  if (!isInitialized) {
    await initializeFirebase();  // 초기화가 안 되어 있으면 초기화 후 Auth 인스턴스 반환
  }
  if (!auth) {
    throw new Error('Auth 인스턴스가 없습니다.');
  }
  return auth;
}

export { db, auth };
