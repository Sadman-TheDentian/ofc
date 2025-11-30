'use server';

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
    // In a real app, you would verify the charge code with the Coinbase API
    // For this mock, we assume any charge code starting with MOCK_ is valid.
    const isPaymentSuccessful = chargeCode.startsWith('MOCK_');

    if (isPaymentSuccessful) {
        // Here you would typically update the user's record in your database
        // e.g., set a 'pro' flag or subscription expiry date.
        console.log(`Upgrading user ${userId} to PRO for charge ${chargeCode}`);
        return { success: true, message: 'Account upgraded to PRO.' };
    } else {
         return { success: false, error: 'Payment verification failed.' };
    }
}
