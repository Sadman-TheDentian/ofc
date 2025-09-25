
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { User } from "firebase/auth";
import { initializeFirebase } from "@/firebase";

export async function createUserProfile(user: User) {
  if (!user) return;
  const { firestore } = initializeFirebase();

  const userRef = doc(firestore, "users", user.uid);

  try {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      plan: 'free', // Default plan
      createdAt: serverTimestamp(),
    }, { merge: true }); // Use merge to avoid overwriting existing data if any
    console.log("User profile created/updated in Firestore for:", user.uid);
  } catch (error) {
    console.error("Error creating user profile in Firestore:", error);
    // Optionally, re-throw the error or handle it as needed
    throw error;
  }
}
