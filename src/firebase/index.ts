'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import {
  FirebaseProvider,
  useFirebase,
  useAuth as useFirebaseAuth,
  useFirestore as useFirebaseFirestore,
  useFirebaseApp,
  useUser as useFirebaseUser,
  useMemoFirebase,
} from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';
import {
  setDocumentNonBlocking,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from './non-blocking-updates';
import {
  initiateAnonymousSignIn,
  initiateEmailSignUp,
  initiateEmailSignIn,
} from './non-blocking-login';
import { FirestorePermissionError } from './errors';
import { errorEmitter, listenForFirestoreErrors } from './error-emitter';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase(): { firebaseApp: FirebaseApp; auth: Auth; firestore: Firestore } {
  if (!getApps().length) {
    let firebaseApp;
    try {
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      if (process.env.NODE_ENV === 'production') {
        console.warn(
          'Automatic initialization failed. Falling back to firebase config object.',
          e
        );
      }
      firebaseApp = initializeApp(firebaseConfig);
    }

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

// Explicitly re-export everything
export {
  FirebaseProvider,
  useFirebase,
  useFirebaseAuth as useAuth, // Renaming to avoid conflict
  useFirebaseFirestore as useFirestore, // Renaming to avoid conflict
  useFirebaseApp,
  useFirebaseUser as useUser, // Renaming to avoid conflict
  useMemoFirebase,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  setDocumentNonBlocking,
  addDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking,
  initiateAnonymousSignIn,
  initiateEmailSignUp,
  initiateEmailSignIn,
  FirestorePermissionError,
  errorEmitter,
  listenForFirestoreErrors,
};
