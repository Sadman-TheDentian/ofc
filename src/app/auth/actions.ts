
'use server';

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
