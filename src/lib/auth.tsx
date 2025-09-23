
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import { createUserProfile } from "./firestore";

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const handleSuccessfulAuth = async (userCredential: UserCredential) => {
    const isNewUser = userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime;
    if (isNewUser) {
        await createUserProfile(userCredential.user);
    }
    router.push("/dashboard");
  };

  const socialSignIn = async (provider: GoogleAuthProvider | GithubAuthProvider) => {
    const result = await signInWithPopup(auth, provider);
    await handleSuccessfulAuth(result);
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    try {
      await socialSignIn(provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await socialSignIn(provider);
    } catch (error) {
      console.error("Error signing in with Github:", error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        await handleSuccessfulAuth(userCredential);
        return userCredential;
    } catch (error) {
        console.error("Error signing up with email:", error);
        throw error;
    }
  }

  const signInWithEmail = async (email: string, pass: string) => {
     try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        router.push("/dashboard");
        return userCredential;
    } catch (error) {
        console.error("Error signing in with email:", error);
        throw error;
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = { user, loading, signInWithGoogle, signInWithGithub, signUpWithEmail, signInWithEmail, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
