
import React, { useState, useEffect } from 'react';
import { Clock, Zap, Crown } from 'lucide-react';
import { getRateLimit, getTimeRemaining } from '../utils/rateLimiter';

interface RateLimitStatusProps {
  onUpgradeClick: () => void;
}

const RateLimitStatus = ({ onUpgradeClick }: RateLimitStatusProps) => {
  const [rateLimit, setRateLimit] = useState(getRateLimit());
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const current = getRateLimit();
      setRateLimit(current);
      
      const now = Date.now();
      if (current.resetTime > now) {
        setTimeUntilReset(getTimeRemaining(current.resetTime - now));
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-green-400" />
          <span className="font-semibold">Free Plan Usage</span>
        </div>
        <button
          onClick={onUpgradeClick}
          className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
        >
          <Crown className="h-4 w-4" />
          Upgrade
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Daily checks remaining:</span>
          <span className={`font-semibold ${rateLimit.checksRemaining > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {rateLimit.checksRemaining}/5
          </span>
        </div>
        
        {timeUntilReset && (
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Resets in:</span>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400">{timeUntilReset}</span>
            </div>
          </div>
        )}
        
        <div className="mt-3 p-3 bg-green-600/10 border border-green-500/20 rounded">
          <p className="text-sm text-green-400">
            ⚡ PRO users get unlimited checks with no waiting time
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitStatus;
