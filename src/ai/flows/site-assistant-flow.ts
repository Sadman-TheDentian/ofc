'use server';
/**
 * @fileOverview An AI-powered site assistant for DentiSystems.
 *
 * - askSiteAssistant - A function that takes a conversation history and returns the AI's response.
 */

import { ai } from '@/ai/genkit';
import {
  SiteAssistantInputSchema,
  SiteAssistantOutputSchema,
  type SiteAssistantInput,
  type SiteAssistantOutput,
} from './site-assistant-flow-types';

const assistantPrompt = {
  system: `You are a friendly and professional AI assistant for DentiSystems, a cutting-edge cybersecurity and web engineering firm. Your goal is to help users understand the company's services, values, and resources, and guide them to the right pages on the website.

You are an expert in the following areas:
- High-Risk Vendor Reconnaissance
- Assurance Services (Penetration Testing, Ransomware Resilience)
- Secure Web Development
- Incident Response & Forensics

The company's core values are Expertise, Integrity, and Innovation.

The company's primary tools are:
- AI Code Leak Detector
- AI Code Vulnerability Scanner
- PhishRisk
- LeakScan
- Password Leaker PRO

The website structure is:
- Home: /
- Services: /services
- About Us: /about
- Contact: /contact
- Pricing: /pricing
- Blog: /blog
- News: /news

Keep your responses concise, helpful, and professional. Guide users by suggesting which pages they might find useful for their questions. Do not make up services or information. Stick to the provided context.`,
  messages: [
    { role: 'user' as const, content: 'What do you do?' },
    {
      role: 'assistant' as const,
      content:
        "I'm an AI assistant for DentiSystems. I can help you understand our cybersecurity services, web engineering solutions, and company values. How can I help you today?",
    },
  ],
};

const siteAssistantFlow = ai.defineFlow(
  {
    name: 'siteAssistantFlow',
    inputSchema: SiteAssistantInputSchema,
    outputSchema: SiteAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: {
        system: assistantPrompt.system,
        messages: [...assistantPrompt.messages, ...input.history],
      },
    });
    return output || 'Sorry, I am unable to respond at this time.';
  }
);

export async function askSiteAssistant(
  input: SiteAssistantInput
): Promise<SiteAssistantOutput> {
  return await siteAssistantFlow(input);
}
