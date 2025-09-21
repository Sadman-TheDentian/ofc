
import CryptoJS from 'crypto-js';

export interface PasswordCheckResult {
  isBreached: boolean;
  breachCount: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskColor: string;
  description: string;
}

// Hash password using SHA-1 (required for HIBP API)
const hashPassword = (password: string): string => {
  return CryptoJS.SHA1(password).toString().toUpperCase();
};

// Get risk level based on breach count
const getRiskLevel = (count: number): PasswordCheckResult['riskLevel'] => {
  if (count === 0) return 'Low';
  if (count <= 10) return 'Medium';
  if (count <= 100) return 'High';
  return 'Critical';
};

// Get risk color based on level
const getRiskColor = (level: PasswordCheckResult['riskLevel']): string => {
  switch (level) {
    case 'Low': return 'text-green-400';
    case 'Medium': return 'text-yellow-400';
    case 'High': return 'text-orange-400';
    case 'Critical': return 'text-red-400';
  }
};

// Get description based on risk level
const getDescription = (level: PasswordCheckResult['riskLevel'], count: number): string => {
  switch (level) {
    case 'Low':
      return 'Great! This password has not been found in any known data breaches.';
    case 'Medium':
      return `This password has been seen ${count} times in data breaches. Consider changing it.`;
    case 'High':
      return `This password has been compromised ${count} times. You should change it immediately.`;
    case 'Critical':
      return `This password has been found ${count} times in breaches. Change it now!`;
  }
};

// Check password using HaveIBeenPwned API with k-anonymity
export const checkPassword = async (password: string): Promise<PasswordCheckResult> => {
  try {
    // Hash the password
    const hashedPassword = hashPassword(password);
    
    // Get first 5 characters for k-anonymity
    const prefix = hashedPassword.substring(0, 5);
    const suffix = hashedPassword.substring(5);
    
    // Query HIBP API with prefix only
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'PasswordLeaker-DentiSystems'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to check password');
    }
    
    const data = await response.text();
    
    // Parse response to find our hash suffix
    const lines = data.split('\n');
    let breachCount = 0;
    
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix.trim().toUpperCase() === suffix) {
        breachCount = parseInt(count.trim(), 10);
        break;
      }
    }
    
    const riskLevel = getRiskLevel(breachCount);
    const riskColor = getRiskColor(riskLevel);
    const description = getDescription(riskLevel, breachCount);
    
    return {
      isBreached: breachCount > 0,
      breachCount,
      riskLevel,
      riskColor,
      description
    };
    
  } catch (error) {
    console.error('Error checking password:', error);
    throw new Error('Unable to check password. Please try again.');
  }
};
