import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit with the Google AI plugin.
// The model will be specified in the individual flows.
export const ai = genkit({
  plugins: [googleAI()],
});
