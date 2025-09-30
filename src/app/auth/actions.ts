
'use server';

import { FirebaseError } from "firebase/app";

// A list of common disposable email domains.
// In a production app, this would be more extensive and could be managed via a database or external API.
const disposableEmailDomains = new Set([
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'throwawaymail.com',
  'yopmail.com',
  'tempail.com',
  'getairmail.com',
  'maildrop.cc',
]);

/**
 * Checks if an email address belongs to a disposable email provider.
 * @param email The email address to check.
 * @returns A promise that resolves to an object indicating if the email is disposable.
 */
export async function checkEmailValidity(email: string): Promise<{ isDisposable: boolean; }> {
  if (!email || !email.includes('@')) {
    // Basic validation, should be complemented by client-side checks.
    return { isDisposable: false }; 
  }

  const domain = email.split('@')[1].toLowerCase();
  const isDisposable = disposableEmailDomains.has(domain);
  
  return { isDisposable };
}

export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number; error?: string }> {
    const secretKey = process.env.RECAPTCHA_API_KEY;
    if (!secretKey) {
        console.error("reCAPTCHA API key is not configured on the server.");
        // This is a server-side configuration issue, so we return a generic error to the client.
        return { success: false, score: 0, error: "Cannot verify your request due to a server configuration issue. Please contact support." };
    }

    try {
        const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/dentisystems-web-2563348-a6782/assessments?key=${secretKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event: {
                    token: token,
                    siteKey: "6LcHfdkrAAAAACT50f21UCQfGiRAoDzPQeKXhbGp",
                    expectedAction: 'SIGNUP' // Ensure this matches the client-side action
                }
            })
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("reCAPTCHA verification request failed:", response.status, errorBody);
            throw new Error(`reCAPTCHA API request failed with status: ${response.status}`);
        }

        const assessment = await response.json();
        
        if (!assessment.tokenProperties.valid) {
            console.error("Invalid reCAPTCHA token:", assessment.tokenProperties.invalidReason);
            return { success: false, score: 0, error: `reCAPTCHA check failed: ${assessment.tokenProperties.invalidReason}` };
        }

        if (assessment.tokenProperties.action !== 'SIGNUP') {
            console.error(`reCAPTCHA action mismatch. Expected 'SIGNUP' but got '${assessment.tokenProperties.action}'`);
            return { success: false, score: 0, error: 'reCAPTCHA action mismatch. Please try again.' };
        }
        
        // Return the score for further validation
        return { success: true, score: assessment.riskAnalysis.score };

    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return { success: false, score: 0, error: 'An unexpected error occurred during security verification.' };
    }
}
