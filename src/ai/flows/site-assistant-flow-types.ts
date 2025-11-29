/**
 * @fileOverview Type definitions for the site assistant flow.
 *
 * This file defines the input and output data structures for the AI chatbot,
 * ensuring type safety between the client-side component and the server-side AI flow.
 */
import { z } from 'zod';

/**
 * Defines a single message in the conversation history.
 */
export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

/**
 * Defines the input for the site assistant flow, which consists
 * of the entire conversation history.
 */
export const SiteAssistantInputSchema = z.object({
  history: z.array(MessageSchema),
});
export type SiteAssistantInput = z.infer<typeof SiteAssistantInputSchema>;

/**
 * Defines the output of the site assistant flow, which is a single
 * string response from the AI.
 */
export const SiteAssistantOutputSchema = z.string();
export type SiteAssistantOutput = z.infer<typeof SiteAssistantOutputSchema>;
