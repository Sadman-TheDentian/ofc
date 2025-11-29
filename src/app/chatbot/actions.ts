'use server';

import {
  askSiteAssistant,
} from '@/ai/flows/site-assistant-flow';
import type { SiteAssistantInput } from '@/ai/flows/site-assistant-flow-types';

export async function getAssistantResponse(
  input: SiteAssistantInput
): Promise<string> {
  try {
    const response = await askSiteAssistant(input);
    return response;
  } catch (error) {
    console.error('Error getting assistant response:', error);
    return 'I apologize, but I encountered an unexpected error and cannot respond at this time.';
  }
}
