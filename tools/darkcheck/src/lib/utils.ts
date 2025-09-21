
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function obfuscateEmail(email: string): string {
  if (!email || !email.includes('@')) {
    return email;
  }
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart.charAt(0)}***@${domain}`;
  }
  return `${localPart.slice(0, 2)}***@${domain}`;
}

// Common disposable email domains
const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com', '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
  'temp-mail.org', 'throwaway.email', 'maildrop.cc', 'sharklasers.com',
  'yopmail.com', 'fake-mail.ml', 'fakeinbox.com', 'spambox.us',
  'tempail.com', 'dispostable.com', 'emailondeck.com', 'getairmail.com'
];

export function isValidEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Trim and check if empty
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Enhanced RFC 5322 compliant regex
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
  
  // Check basic format
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Split email into parts
  const [localPart, domain] = trimmedEmail.split('@');
  
  // Local part validation
  if (!localPart || localPart.length === 0 || localPart.length > 64) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Domain validation
  if (!domain || domain.length === 0 || domain.length > 255) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Check for starting/ending dots in local part
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Check for invalid characters at start/end
  if (trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.') || 
      trimmedEmail.startsWith('@') || trimmedEmail.endsWith('@')) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Domain must have at least one dot and valid TLD
  if (!domain.includes('.') || domain.endsWith('.') || domain.startsWith('.')) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  // Check for disposable email domains
  const domainLower = domain.toLowerCase();
  if (DISPOSABLE_EMAIL_DOMAINS.includes(domainLower)) {
    return { isValid: false, error: 'Temporary email addresses are not allowed.' };
  }

  // Additional checks for obvious fake domains
  if (domainLower.includes('fake') || domainLower.includes('test') || 
      domainLower === 'example.com' || domainLower === 'email.com') {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }

  return { isValid: true };
}
