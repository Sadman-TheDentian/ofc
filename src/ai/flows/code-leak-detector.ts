'use server';
/**
 * @fileOverview A code leak detector AI agent.
 *
 * - codeLeakDetectorFlow - A function that handles the code leak detection process.
 * - CodeLeakDetectorInput - The input type for the codeLeakDetectorFlow function.
 * - CodeLeakDetectorOutput - The return type for the codeLeakDetectorFlow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeLeakDetectorInputSchema = z.object({
  code: z.string().describe('The code snippet to analyze for leaks.'),
});
export type CodeLeakDetectorInput = z.infer<typeof CodeLeakDetectorInputSchema>;

const CodeLeakDetectorOutputSchema = z.object({
  leaks: z
    .array(
      z.object({
        type: z.string().describe('The type of secret detected (e.g., API Key, Password).'),
        line: z.number().describe('The line number where the secret was found.'),
        secret: z.string().describe('The detected secret or a masked version of it.'),
      })
    )
    .describe('A list of detected secrets.'),
});
export type CodeLeakDetectorOutput = z.infer<typeof CodeLeakDetectorOutputSchema>;

export async function codeLeakDetector(input: CodeLeakDetectorInput): Promise<CodeLeakDetectorOutput> {
  return codeLeakDetectorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeLeakDetectorPrompt',
  input: {schema: CodeLeakDetectorInputSchema},
  output: {schema: CodeLeakDetectorOutputSchema},
  prompt: `You are a security expert specializing in detecting hardcoded secrets in source code. Analyze the following code and identify any potential leaks such as API keys, passwords, or private certificates.

For each leak you find, provide the type of secret, the line number, and the secret itself.

Code to analyze:
'''
{{{code}}}
'''`,
});

const codeLeakDetectorFlow = ai.defineFlow(
  {
    name: 'codeLeakDetectorFlow',
    inputSchema: CodeLeakDetectorInputSchema,
    outputSchema: CodeLeakDetectorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
