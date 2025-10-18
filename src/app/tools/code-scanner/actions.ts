'use server';

import { scanCodeForVulnerabilities } from '@/ai/flows/code-vulnerability-scanner';
import type { ScanCodeInput, ScanCodeOutput } from '@/ai/flows/code-vulnerability-scanner-types';
import { FirebaseError } from 'firebase/app';

export async function analyzeCode(input: ScanCodeInput): Promise<ScanCodeOutput> {
  try {
    const result = await scanCodeForVulnerabilities(input);
    return result;
  } catch (error) {
    console.error('Error analyzing code:', error);
    if (error instanceof FirebaseError) {
       return { vulnerabilities: [{ line: 0, vulnerability: 'Analysis Failed', suggestion: error.message }] };
    }
    // In case of an unexpected error from the AI flow, return a structured error response
    return { vulnerabilities: [{ line: 0, vulnerability: 'Analysis Failed', suggestion: 'An unexpected error occurred during analysis.' }] };
  }
}
