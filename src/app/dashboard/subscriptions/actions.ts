
'use server';

import { createCoinbaseCharge as createChargeFlow } from '@/ai/flows/coinbase-commerce-flow';
import { collection, doc, getDoc, getDocs, query, updateDoc, writeBatch, where } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import crypto from 'crypto';

type CreateChargeInput = {
  userId: string;
  email: string;
  clientOrigin: string;
};

export async function createCoinbaseCharge(input: CreateChargeInput) {
  try {
    const result = await createChargeFlow(input);
    return { success: true, ...result };
  } catch (error) {
    console.error('Error creating Coinbase charge:', error);
    return { success: false, error: 'Failed to create payment session.' };
  }
}

export async function verifyPaymentAndUpgrade(chargeCode: string, userId: string) {
    const { firestore } = initializeFirebase();

    try {
        // In a real app, you would verify the charge code with the Coinbase API
        const isPaymentSuccessful = !!chargeCode;

        if (isPaymentSuccessful) {
            const userDocRef = doc(firestore, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists() && userDoc.data().plan !== 'pro') {
                
                // Secure API Key Generation (Server-Side)
                const apiKeySecret = process.env.API_KEY_SECRET || "default-secret-for-local-dev";
                if (!apiKeySecret) {
                  throw new Error("API_KEY_SECRET is not configured on the server.");
                }
                const plaintextKey = `ds_prod_${crypto.randomBytes(24).toString('hex')}`;
                const hashedKey = crypto.createHmac('sha256', apiKeySecret).update(plaintextKey).digest('hex');

                await updateDoc(userDocRef, {
                    plan: 'pro',
                    apiKeyHashed: hashedKey,
                    apiKeyCreatedAt: new Date(),
                });
                
                return { success: true, message: 'Account upgraded to PRO.', apiKey: plaintextKey };
            }
            return { success: true, message: 'Account is already PRO.' };
        } else {
             return { success: false, error: 'Payment verification failed.' };
        }
    } catch (error) {
        console.error("Error during account upgrade:", error);
        return { success: false, error: "An unexpected error occurred during account upgrade." };
    }
}

export async function migrateFakeProUsers() {
  const { firestore } = initializeFirebase();
  const usersRef = collection(firestore, 'users');
  const paymentsRef = collection(firestore, 'payments');
  
  // Find all users who are marked as 'pro'
  const proUsersQuery = query(usersRef, where('plan', '==', 'pro'));
  const proUsersSnapshot = await getDocs(proUsersQuery);

  const migratedUsers: string[] = [];
  const usersToReview: string[] = [];

  const batch = writeBatch(firestore);

  for (const userDoc of proUsersSnapshot.docs) {
    const userId = userDoc.id;
    
    // Check if a corresponding payment exists for this user
    const paymentQuery = query(paymentsRef, where('userId', '==', userId), where('status', '==', 'completed'));
    const paymentSnapshot = await getDocs(paymentQuery);
    
    if (paymentSnapshot.empty) {
      // This is a "fake" pro user with no payment record. Downgrade them.
      const userRef = doc(firestore, 'users', userId);
      batch.update(userRef, {
        plan: 'free',
        apiKeyHashed: null,
        apiKeyCreatedAt: null
      });
      migratedUsers.push(userId);
    } else {
      // This user has a payment record, but we might want to review them.
      usersToReview.push(userId);
    }
  }

  await batch.commit();

  console.log(`Migration Complete. Downgraded ${migratedUsers.length} users to 'free'.`);
  console.log(`Users to manually review (had payment records): ${usersToReview.length}`);
  
  return {
    migratedCount: migratedUsers.length,
    migratedUsers: migratedUsers,
    reviewCount: usersToReview.length,
    usersToReview: usersToReview
  };
}
