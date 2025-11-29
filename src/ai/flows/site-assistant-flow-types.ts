/**
 * @fileOverview Type definitions for the site assistant flow.
 */
import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type Message = z.infer<typeof MessageSchema>;

export const SiteAssistantInputSchema = z.object({
  history: z.array(MessageSchema),
});
export type SiteAssistantInput = z.infer<typeof SiteAssistantInputSchema>;

export const SiteAssistantOutputSchema = z.string();
export type SiteAssistantOutput = z.infer<typeof SiteAssistantOutputSchema>;
