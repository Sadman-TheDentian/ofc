'use server';

import { 
    codeLeakDetector, 
    type CodeLeakDetectorInput, 
    type CodeLeakDetectorOutput 
} from '@/ai/flows/code-leak-detector';
import { FirebaseError } from 'firebase/app';

export async function analyzeCodeForLeaks(input: CodeLeakDetectorInput): Promise<CodeLeakDetectorOutput> {
  try {
    const result = await codeLeakDetector(input);
    return result;
  } catch (error) {
    console.error('Error analyzing code for leaks:', error);
    // In case of an unexpected error from the AI flow, return a structured error response
    if (error instanceof FirebaseError) {
        return { leaks: [{ type: 'Analysis Failed', line: 0, secret: error.message }] };
    }
    return { leaks: [{ type: 'Analysis Failed', line: 0, secret: 'An unexpected error occurred during analysis.' }] };
  }
}
