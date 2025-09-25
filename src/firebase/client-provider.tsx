
"use client";

import { useEffect, useState, type ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';

import { FirebaseProvider } from './provider';
import { initializeFirebase } from '.';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    // initialize firebase on the client
    const firebaseInstances = initializeFirebase();
    setFirebase(firebaseInstances);
  }, []);

  if (!firebase) {
    // You can render a loading indicator here if you want.
    // Returning null will prevent children from rendering until Firebase is ready.
    return null;
  }

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
