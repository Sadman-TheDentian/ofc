'use client';
import {
  doc,
  setDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export async function createUserProfile(
  db: Firestore,
  userData: UserProfileData
) {
  if (!userData.uid) {
    throw new Error('User ID is required to create a database entry.');
  }

  const userRef = doc(db, 'users', userData.uid);

  try {
    await setDoc(
      userRef,
      {
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        plan: 'free', // Default plan
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(
      'User profile created/updated in Firestore for:',
      userData.uid
    );
  } catch (error) {
    console.error('Error creating user profile in Firestore:', error);
    throw new Error('Failed to save user profile to the database.');
  }
}
