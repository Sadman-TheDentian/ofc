
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Search, Shield, AlertTriangle, Lock, Clock } from 'lucide-react';
import { checkPassword, PasswordCheckResult } from '../utils/passwordChecker';
import { canMakeRequest, updateRateLimit, getTimeRemaining } from '../utils/rateLimiter';
import RateLimitStatus from './RateLimitStatus';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PasswordCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showProModal, setShowProModal] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<{ waitTime: number; reason: string } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rateLimitError) {
      interval = setInterval(() => {
        const newWaitTime = rateLimitError.waitTime - 1000;
        if (newWaitTime <= 0) {
          setRateLimitError(null);
        } else {
          setRateLimitError({ ...rateLimitError, waitTime: newWaitTime });
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [rateLimitError]);

  const handleCheck = async () => {
    if (!password.trim()) {
      setError('Please enter a password to check');
      return;
    }

    // Check rate limiting
    const rateLimitCheck = canMakeRequest();
    if (!rateLimitCheck.allowed) {
      setRateLimitError({
        waitTime: rateLimitCheck.waitTime!,
        reason: rateLimitCheck.reason!
      });
      return;
    }

    setIsChecking(true);
    setError(null);
    setResult(null);
    setRateLimitError(null);

    try {
      const checkResult = await checkPassword(password);
      setResult(checkResult);
      updateRateLimit(); // Update rate limit after successful check
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsChecking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  const getRateLimitMessage = () => {
    if (!rateLimitError) return null;
    
    const timeRemaining = getTimeRemaining(rateLimitError.waitTime);
    
    if (rateLimitError.reason === 'daily_limit') {
      return `Daily limit reached. Resets in ${timeRemaining}`;
    } else {
      return `Please wait ${timeRemaining} before your next check`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Password Leaker
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Check if your password has been exposed in data breaches. We use advanced k-anonymity 
          techniques to protect your privacy while scanning millions of compromised passwords.
        </p>
      </div>

      {/* Rate Limit Status */}
      <div className="mb-8">
        <RateLimitStatus onUpgradeClick={() => setShowProModal(true)} />
      </div>

      {/* Password Input */}
      <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password to check..."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <button
            onClick={handleCheck}
            disabled={isChecking || !password.trim() || rateLimitError !== null}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            {isChecking ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Checking...
              </>
            ) : rateLimitError ? (
              <>
                <Clock className="h-5 w-5" />
                {getRateLimitMessage()}
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Check Password
              </>
            )}
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
          <Shield className="h-4 w-4 text-green-400" />
          <span>Your password is never sent or stored. We use k-anonymity to protect your privacy.</span>
        </div>
      </div>

      {/* Rate Limit Error */}
      {rateLimitError && (
        <div className="bg-orange-900/50 border border-orange-500/50 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 text-orange-400">
            <Clock className="h-5 w-5" />
            <span>{getRateLimitMessage()}</span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Upgrade to PRO for unlimited password checks with no waiting time.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Risk Assessment */}
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Security Assessment</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">
                  <span className={result.riskColor}>{result.breachCount.toLocaleString()}</span>
                </div>
                <p className="text-gray-400">Times Found in Breaches</p>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${result.riskColor}`}>
                  {result.riskLevel} Risk
                </div>
                <p className="text-gray-300">{result.description}</p>
              </div>
            </div>
          </div>

          {/* PRO Features Preview */}
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Advanced Security Analysis</h3>
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  PRO
                </div>
              </div>

              {/* Blurred/Locked Content */}
              <div className="space-y-4 relative">
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Unlock Premium Features</h4>
                    <p className="text-gray-400 mb-4">Get unlimited checks, breach source details, and continuous monitoring</p>
                    <button
                      onClick={() => setShowProModal(true)}
                      className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Upgrade to PRO
                    </button>
                  </div>
                </div>

                {/* Sample locked content */}
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Data Breach Sources</span>
                    <span className="text-green-400">12 breaches found</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">First Compromise Date</span>
                    <span className="text-gray-400">January 2019</span>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <span className="font-medium">Security Recommendations</span>
                  <p className="text-gray-400 mt-2">Personalized advice based on your password pattern...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRO Interest Modal */}
      {showProModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-center">Upgrade to PRO!</h3>
            <p className="text-gray-300 mb-6 text-center">
              Get unlimited password checks, detailed breach analysis, continuous monitoring, 
              and premium security features.
            </p>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowProModal(false);
                    // Here you would typically submit the email
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;
