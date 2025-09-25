
"use server";

import { initializeFirebase } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

interface UserProfileData {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export async function createUserInDatabase(userData: UserProfileData) {
    const { firestore } = initializeFirebase();
    if (!userData.uid) {
        throw new Error("User ID is required to create a database entry.");
    }

    const userRef = doc(firestore, "users", userData.uid);

    try {
        await setDoc(userRef, {
            uid: userData.uid,
            email: userData.email,
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            plan: 'free', // Default plan
            createdAt: serverTimestamp(),
        }, { merge: true });
        console.log("User profile created/updated in Firestore for:", userData.uid);
    } catch (error) {
        console.error("Error creating user profile in Firestore:", error);
        throw new Error("Failed to save user profile to the database.");
    }
}
