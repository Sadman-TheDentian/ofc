
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
import { doc, getDoc, serverTimestamp, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
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
  const { auth, firestore } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth || !firestore) {
      setLoading(true);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
       if (user) {
        // User is signed in, now verify their plan and data integrity.
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            // AUTO-DOWNGRADE LOGIC
            if (userData.plan === 'pro') {
                const paymentsRef = collection(firestore, "payments");
                const q = query(paymentsRef, where("userId", "==", user.uid), where("status", "==", "completed"));
                const paymentSnapshot = await getDocs(q);

                if (paymentSnapshot.empty) {
                    // This is a fake "pro" user. Downgrade them.
                    console.warn(`User ${user.uid} has 'pro' plan but no valid payment. Downgrading.`);
                    await updateDoc(userDocRef, {
                        plan: 'free',
                        apiKeyHashed: null,
                        apiKeyCreatedAt: null,
                    });
                }
            }
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, firestore]);

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
          plan: 'free', // All new users default to 'free'
          apiKeyHashed: null,
          apiKeyCreatedAt: null,
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
