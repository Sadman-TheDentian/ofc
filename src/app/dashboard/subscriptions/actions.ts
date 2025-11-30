'use server';

import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export async function createCoinbaseCharge(input: { userId: string; email: string; clientOrigin: string; }) {
    // This function is a placeholder. 
    // In a real application, you would make a POST request to Coinbase Commerce API here.
    const mockChargeCode = `MOCK_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const mockHostedUrl = `${input.clientOrigin}/dashboard/payment-success?code=${mockChargeCode}`;

    return {
      success: true,
      charge_code: mockChargeCode,
      hosted_url: mockHostedUrl,
    };
}

export async function verifyPaymentAndUpgrade(chargeCode: string, userId: string) {
    const { firestore } = initializeFirebase();

    try {
        // In a real app, you would verify the charge code with the Coinbase API
        // For this mock, we assume any charge code starting with MOCK_ is valid.
        const isPaymentSuccessful = chargeCode.startsWith('MOCK_');

        if (isPaymentSuccessful) {
            const userDocRef = doc(firestore, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists() && userDoc.data().plan !== 'pro') {
                await updateDoc(userDocRef, {
                    plan: 'pro',
                });
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
