
'use client';

import { useState, useEffect } from 'react';
import { listenForFirestoreErrors } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It throws any received error to be caught by Next.js's global-error.tsx.
 */
export function FirebaseErrorListener(): null {
  // Use the specific error type for the state for type safety.
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const unsubscribe = listenForFirestoreErrors((err) => {
      setError(err);
    });

    return () => unsubscribe();
  }, []);

  if (error) {
    throw error; // Let Next.js error boundary catch it
  }

  return null;
}
