
'use server';
/**
 * @fileOverview A Genkit flow for creating a Coinbase Commerce charge.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CreateChargeInputSchema = z.object({
  userId: z.string().describe('The internal user ID of the customer.'),
  email: z.string().email().describe('The email address of the customer.'),
  clientOrigin: z.string().url().describe('The origin URL of the client making the request.'),
});
export type CreateChargeInput = z.infer<typeof CreateChargeInputSchema>;

const CreateChargeOutputSchema = z.object({
  charge_code: z.string().describe('The code for the newly created charge.'),
  hosted_url: z.string().url().describe('The URL where the user can complete the payment.'),
});
export type CreateChargeOutput = z.infer<typeof CreateChargeOutputSchema>;

export async function createCoinbaseCharge(input: CreateChargeInput): Promise<CreateChargeOutput> {
  return createCoinbaseChargeFlow(input);
}

const createCoinbaseChargeFlow = ai.defineFlow(
  {
    name: 'createCoinbaseChargeFlow',
    inputSchema: CreateChargeInputSchema,
    outputSchema: CreateChargeOutputSchema,
  },
  async (input) => {
    // In a real application, you would use an API key stored securely.
    // For this demonstration, we are mocking the API response.
    console.log('Simulating Coinbase Commerce charge creation for:', input.email);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    // This is a mock response. In a real application, you would make a POST request
    // to `https://api.commerce.coinbase.com/charges` with the appropriate payload.
    const mockChargeCode = `MOCK_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    // Construct the success URL using the client's origin to ensure it works in any environment.
    const mockHostedUrl = `${input.clientOrigin}/dashboard/payment-success?code=${mockChargeCode}`;

    return {
      charge_code: mockChargeCode,
      hosted_url: mockHostedUrl,
    };
  }
);
