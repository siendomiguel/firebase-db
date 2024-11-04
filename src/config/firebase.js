import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

const credentials = JSON.parse(process.env.FIREBASE_CREDENTIALS ?? process.env.FIREBASE_CREDENTIALS_TEST);

initializeApp({
  credential: admin.credential.cert(credentials),
});

export const db = getFirestore();
