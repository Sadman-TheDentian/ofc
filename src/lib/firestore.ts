
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore"; 
import { User } from "firebase/auth";
import { app } from "./firebase";

const db = getFirestore(app);

export async function createUserProfile(user: User) {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

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
