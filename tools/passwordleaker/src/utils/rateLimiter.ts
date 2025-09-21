
export interface RateLimit {
  lastCheck: number;
  checksRemaining: number;
  resetTime: number;
}

const RATE_LIMIT_KEY = 'passwordChecker_rateLimit';
const FREE_COOLDOWN_MINUTES = 30;
const MAX_DAILY_CHECKS = 5;

export const getRateLimit = (): RateLimit => {
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  if (!stored) {
    return {
      lastCheck: 0,
      checksRemaining: MAX_DAILY_CHECKS,
      resetTime: getNextResetTime()
    };
  }
  
  const rateLimit = JSON.parse(stored);
  
  // Reset daily checks if it's a new day
  if (Date.now() > rateLimit.resetTime) {
    return {
      lastCheck: 0,
      checksRemaining: MAX_DAILY_CHECKS,
      resetTime: getNextResetTime()
    };
  }
  
  return rateLimit;
};

export const updateRateLimit = (): void => {
  const current = getRateLimit();
  const now = Date.now();
  
  const updated: RateLimit = {
    lastCheck: now,
    checksRemaining: Math.max(0, current.checksRemaining - 1),
    resetTime: current.resetTime
  };
  
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(updated));
};

export const canMakeRequest = (): { allowed: boolean; waitTime?: number; reason?: string } => {
  const rateLimit = getRateLimit();
  const now = Date.now();
  
  // Check daily limit
  if (rateLimit.checksRemaining <= 0) {
    const timeUntilReset = rateLimit.resetTime - now;
    return {
      allowed: false,
      waitTime: timeUntilReset,
      reason: 'daily_limit'
    };
  }
  
  // Check cooldown period
  const timeSinceLastCheck = now - rateLimit.lastCheck;
  const cooldownTime = FREE_COOLDOWN_MINUTES * 60 * 1000;
  
  if (timeSinceLastCheck < cooldownTime) {
    const waitTime = cooldownTime - timeSinceLastCheck;
    return {
      allowed: false,
      waitTime,
      reason: 'cooldown'
    };
  }
  
  return { allowed: true };
};

export const getTimeRemaining = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

const getNextResetTime = (): number => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime();
};
