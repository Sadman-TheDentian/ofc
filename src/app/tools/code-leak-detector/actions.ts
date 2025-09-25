'use server';

import { codeLeakDetector, CodeLeakDetectorInput, CodeLeakDetectorOutput } from '@/ai/flows/code-leak-detector';

export async function analyzeCodeForLeaks(
  input: CodeLeakDetectorInput
): Promise<CodeLeakDetectorOutput> {
  console.log('Analyzing code snippet for leaks...');
  try {
    const result = await codeLeakDetector(input);
    return result;
  } catch (error) {
    console.error('Error analyzing code for leaks:', error);
    return {
      leaks: [{
        line: 0,
        type: "Analysis Failed",
        secret: "An unexpected error occurred while analyzing the code. Please check the server logs or try again later."
      }],
    };
  }
}
