
'use server';

/**
 * @fileOverview An AI-powered threat monitoring flow that analyzes security news and
 * issues security alert notifications to users through the dashboard based on potential
 * risks to their organization, such as leaked passwords.
 *
 * - aiPoweredThreatMonitoring - A function that triggers the threat monitoring process.
 * - AIPoweredThreatMonitoringInput - The input type for the aiPoweredThreatMonitoring function.
 * - AIPoweredThreatMonitoringOutput - The return type for the aiPoweredThreatMonitoring function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredThreatMonitoringInputSchema = z.object({
  organizationName: z
    .string()
    .describe('The name of the organization to monitor for security threats.'),
  securityNews: z.string().describe('The latest security news to analyze.'),
});
export type AIPoweredThreatMonitoringInput = z.infer<
  typeof AIPoweredThreatMonitoringInputSchema
>;

const AIPoweredThreatMonitoringOutputSchema = z.object({
  threatDetected: z
    .boolean()
    .describe('Whether a security threat was detected for the organization.'),
  alertMessage: z
    .string()
    .optional()
    .describe('A message describing the security threat, if any.'),
});
export type AIPoweredThreatMonitoringOutput = z.infer<
  typeof AIPoweredThreatMonitoringOutputSchema
>;

export async function aiPoweredThreatMonitoring(
  input: AIPoweredThreatMonitoringInput
): Promise<AIPoweredThreatMonitoringOutput> {
  return aiPoweredThreatMonitoringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredThreatMonitoringPrompt',
  input: {schema: AIPoweredThreatMonitoringInputSchema},
  output: {schema: AIPoweredThreatMonitoringOutputSchema},
  prompt: `You are a security expert tasked with analyzing security news for potential threats to organizations.

  Based on the provided security news, determine if there is a threat to the specified organization.

  Organization Name: {{{organizationName}}}
  Security News: {{{securityNews}}}

  If a threat is detected, set threatDetected to true and provide a detailed alertMessage describing the threat.
  If no threat is detected, set threatDetected to false and do not populate alertMessage.

  Ensure the alertMessage is clear, concise, and actionable.
`,
});

const aiPoweredThreatMonitoringFlow = ai.defineFlow(
  {
    name: 'aiPoweredThreatMonitoringFlow',
    inputSchema: AIPoweredThreatMonitoringInputSchema,
    outputSchema: AIPoweredThreatMonitoringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    