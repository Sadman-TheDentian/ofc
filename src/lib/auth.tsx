
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase'; // Use the central Firebase hook
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { checkEmailValidity } from '@/app/auth/actions';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<any>;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth, firestore } = useFirebase(); // Get auth and firestore from the central provider
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setLoading(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
       if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const createUserInDatabase = async (user: User) => {
    if (!firestore) {
      console.error("Firestore instance not available");
      throw new Error("Database service is not configured.");
    }
    try {
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          plan: 'free', // All new users start on the free plan.
          apiKey: null, // API key is null until they upgrade.
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
       console.error("Error creating user profile in Firestore:", error);
    }
  };

  const handleSuccessfulAuth = async (userCredential: UserCredential) => {
    const user = userCredential.user;
    await createUserInDatabase(user);
    router.push('/dashboard');
  };

  const socialSignIn = async (
    provider: GoogleAuthProvider | GithubAuthProvider
  ) => {
    if (!auth) throw new Error("Firebase services not available");
    try {
      const result = await signInWithPopup(auth, provider);
      await handleSuccessfulAuth(result);
    } catch (error) {
      console.error(`Error signing in with ${provider.providerId}:`, error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    await socialSignIn(googleProvider);
  };

  const signInWithGithub = async () => {
    await socialSignIn(githubProvider);
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    if (!auth) throw new Error("Firebase services not available");

    const { isDisposable } = await checkEmailValidity(email);
    if(isDisposable) {
      throw new Error("Disposable email addresses are not allowed.");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      await handleSuccessfulAuth(userCredential);
      return userCredential;
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    if (!auth) throw new Error("Firebase services not available");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      router.push('/dashboard');
      return userCredential;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
