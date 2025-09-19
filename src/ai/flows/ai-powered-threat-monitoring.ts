
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

// Simulated news fetching flow
const fetchSecurityNews = ai.defineFlow(
  {
    name: 'fetchSecurityNews',
    outputSchema: z.string(),
  },
  async () => {
    // In a real-world scenario, this would fetch news from an API
    // (e.g., NewsAPI, a specialized threat intel feed).
    // For this demo, we'll return a pre-defined news article that
    // mentions our target organization.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return `Title: Major SaaS Provider "ConnectSphere" Reports Data Breach, User Passwords and API Keys Exposed

Date: October 26, 2023

A popular software-as-a-service (SaaS) provider, ConnectSphere, has confirmed a significant data breach affecting millions of its users. The company, which provides project management and collaboration tools, announced that a threat actor gained unauthorized access to its production database earlier this month.

The compromised data includes user email addresses, salted and hashed passwords, and, for a subset of users, active API keys. ConnectSphere's initial investigation reveals that the attacker exploited a previously unknown vulnerability in a third-party library used by their platform.

ConnectSphere is forcing a password reset for all users and has invalidated all exposed API keys. The company is urging its customers, especially those who reuse passwords across different services, to change their credentials on other platforms immediately. Security teams at companies using ConnectSphere are advised to audit their systems for any unusual activity related to the exposed API keys. DentiSystems is a known user of ConnectSphere for internal project tracking.`;
  }
);


const AIPoweredThreatMonitoringInputSchema = z.object({
  organizationName: z
    .string()
    .describe('The name of the organization to monitor for security threats.'),
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
  sourceNews: z.string().optional().describe('The source news article that was analyzed.'),
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
  input: {schema: z.object({ organizationName: z.string(), securityNews: z.string() }) },
  output: {schema: AIPoweredThreatMonitoringOutputSchema.pick({ threatDetected: true, alertMessage: true })},
  prompt: `You are a security expert tasked with analyzing security news for potential threats to organizations.

  Based on the provided security news, determine if there is a threat to the specified organization.

  Organization Name: {{{organizationName}}}
  Security News: {{{securityNews}}}

  If a threat is detected that directly mentions or impacts the specified organization, set threatDetected to true and provide a detailed, actionable alertMessage describing the threat.
  If no direct threat is detected, set threatDetected to false and do not populate alertMessage.

  Ensure the alertMessage is clear, concise, and provides specific recommended actions.
`,
});

const aiPoweredThreatMonitoringFlow = ai.defineFlow(
  {
    name: 'aiPoweredThreatMonitoringFlow',
    inputSchema: AIPoweredThreatMonitoringInputSchema,
    outputSchema: AIPoweredThreatMonitoringOutputSchema,
  },
  async input => {
    // 1. Fetch the latest security news
    const securityNews = await fetchSecurityNews();

    // 2. Analyze the news for threats
    const {output} = await prompt({
      organizationName: input.organizationName,
      securityNews: securityNews
    });
    
    // 3. Return the combined result
    return {
      ...output!,
      sourceNews: securityNews,
    };
  }
);
