
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
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

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

  const handleAuthRedirect = () => {
    router.push("/dashboard");
  };
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      handleAuthRedirect();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      handleAuthRedirect();
    } catch (error) {
      console.error("Error signing in with Github:", error);
    }
  };

  const signUpWithEmail = async (email: string, pass: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        handleAuthRedirect();
        return userCredential;
    } catch (error) {
        console.error("Error signing up with email:", error);
        throw error;
    }
  }

  const signInWithEmail = async (email: string, pass: string) => {
     try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        handleAuthRedirect();
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
