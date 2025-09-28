
'use server';

import { createCoinbaseCharge as createChargeFlow } from '@/ai/flows/coinbase-commerce-flow';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { generate as generateApiKey } from 'random-string';

type CreateChargeInput = {
  userId: string;
  email: string;
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
        // For this demo, we'll simulate a successful verification.
        const isPaymentSuccessful = !!chargeCode;

        if (isPaymentSuccessful) {
            const userDocRef = doc(firestore, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists() && userDoc.data().plan !== 'pro') {
                const newApiKey = `ds_prod_${generateApiKey(32)}`;
                await updateDoc(userDocRef, {
                    plan: 'pro',
                    apiKey: newApiKey,
                });

                // Here you would also log the transaction in a 'payments' collection
                
                return { success: true, message: 'Account upgraded to PRO.' };
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
