
'use server';

import { scanCodeForVulnerabilities } from '@/ai/flows/code-vulnerability-scanner';
import type { ScanCodeInput, ScanCodeOutput } from '@/ai/flows/code-vulnerability-scanner-types';

export async function analyzeCode(
  input: ScanCodeInput
): Promise<ScanCodeOutput> {
  console.log('Analyzing code snippet...');
  try {
    const result = await scanCodeForVulnerabilities(input);
    return result;
  } catch (error) {
    console.error('Error analyzing code:', error);
    // In a real app, you'd want more robust error handling
    return {
      vulnerabilities: [{
        line: 0,
        vulnerability: "Analysis Failed",
        suggestion: "An unexpected error occurred while analyzing the code. Please check the server logs or try again later."
      }],
    };
  }
}
