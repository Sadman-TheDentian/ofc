
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
  sendEmailVerification,
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
  signUpWithEmail: (email: string, pass: string, token: string) => Promise<any>;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signOut: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
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
        // User is signed in
        await createUserInDatabase(user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, firestore, router]);

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
          createdAt: serverTimestamp(),
          plan: 'free', // Default plan
        });
      }
    } catch (error) {
       console.error("Error creating user profile in Firestore:", error);
    }
  };

  const handleSuccessfulAuth = async (userCredential: UserCredential, isNewUser = false) => {
    await createUserInDatabase(userCredential.user);
    if(isNewUser && userCredential.user.email) { // Only send verification for email sign-ups
        await sendEmailVerification(userCredential.user);
        router.push('/auth/verify-email');
    } else {
        router.push('/dashboard');
    }
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
  
  const signUpWithEmail = async (email: string, pass: string, token: string): Promise<UserCredential> => {
     if (!auth) throw new Error("Firebase services not available");

    const { isDisposable } = await checkEmailValidity(email);
    if(isDisposable) {
      throw new Error("Disposable email addresses are not allowed.");
    }
    
    // Server-side reCAPTCHA verification
    const recaptchaApiKey = process.env.RECAPTCHA_API_KEY;
    if (!recaptchaApiKey) {
        console.error("reCAPTCHA API key is not configured on the server.");
        throw new Error("Cannot verify your request. Please contact support.");
    }

    const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/dentisystems-web-2563348-a6782/assessments?key=${recaptchaApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event: {
                token: token,
                siteKey: "6LcHfdkrAAAAACT50f21UCQfGiRAoDzPQeKXhbGp",
                expectedAction: 'SIGNUP'
            }
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("reCAPTCHA verification request failed:", response.status, errorBody);
        throw new Error("reCAPTCHA verification request failed.");
    }

    const assessment = await response.json();
    
    if (!assessment.tokenProperties.valid) {
        console.error("Invalid reCAPTCHA token:", assessment.tokenProperties.invalidReason);
        throw new Error(`reCAPTCHA check failed: ${assessment.tokenProperties.invalidReason}`);
    }
    
    // Recommended threshold for sign-up is 0.7
    if (assessment.riskAnalysis.score < 0.7) {
         console.warn(`Low reCAPTCHA score: ${assessment.riskAnalysis.score}. Blocking signup.`);
         throw new Error("Your request was flagged as suspicious. Please try again.");
    }

    // If verification passes, create the user
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            pass
        );
        await handleSuccessfulAuth(userCredential, true);
        return userCredential;
    } catch (error) {
        console.error('Error creating Firebase user:', error);
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
      await handleSuccessfulAuth(userCredential);
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
  
  const resendVerificationEmail = async () => {
    if (!auth?.currentUser) {
        throw new Error("No user is currently signed in.");
    }
    await sendEmailVerification(auth.currentUser);
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    // @ts-ignore
    signUpWithEmail,
    signInWithEmail,
    signOut,
    resendVerificationEmail
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
