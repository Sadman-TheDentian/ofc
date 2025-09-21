
import { useState, useEffect } from 'react';
import { Search, Loader2, Shield, Key, Mail, Users } from 'lucide-react';
import { checkEmailForBreaches, checkPasswordForBreaches, BreachResult, PasswordResult } from '@/lib/breachCheck';
import { isValidEmail } from '@/lib/utils';
import ResultCard from '@/components/ResultCard';
import PasswordResultCard from '@/components/PasswordResultCard';
import ShareResult from '@/components/ShareResult';

const Check = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkType, setCheckType] = useState<'email' | 'password'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BreachResult | null>(null);
  const [passwordResult, setPasswordResult] = useState<PasswordResult | null>(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [totalScans, setTotalScans] = useState(() => {
    const saved = localStorage.getItem('darkcheck_total_scans');
    return saved ? parseInt(saved) : 800000;
  });

  useEffect(() => {
    localStorage.setItem('darkcheck_total_scans', totalScans.toString());
  }, [totalScans]);

  const validateEmail = (emailValue: string) => {
    if (!emailValue.trim()) {
      setEmailError('');
      return false;
    }
    
    const validation = isValidEmail(emailValue.trim());
    if (!validation.isValid) {
      setEmailError(validation.error || 'Please enter a valid email address.');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear previous results when user starts typing
    if (result) {
      setResult(null);
    }
    
    // Validate email on change
    validateEmail(newEmail);
  };

  const checkEmail = async () => {
    const trimmedEmail = email.trim();
    const validation = isValidEmail(trimmedEmail);
    
    if (!validation.isValid) {
      setEmailError(validation.error || 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setPasswordResult(null);
    setEmailError('');
    setTotalScans(prev => prev + 1);
    
    // Minimum loading time of 1.5 seconds for better UX
    const startTime = Date.now();
    const breachResult = await checkEmailForBreaches(trimmedEmail);
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(1500 - elapsedTime, 0);
    
    setTimeout(() => {
      setResult(breachResult);
      setIsLoading(false);
    }, remainingTime);
  };

  const checkPassword = async () => {
    if (!password.trim()) {
      setPasswordError('Please enter a password to check.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setPasswordResult(null);
    setPasswordError('');
    setTotalScans(prev => prev + 1);
    
    // Minimum loading time of 1 second for better UX
    const startTime = Date.now();
    const passwordCheckResult = await checkPasswordForBreaches(password);
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(1000 - elapsedTime, 0);
    
    setTimeout(() => {
      setPasswordResult(passwordCheckResult);
      setIsLoading(false);
    }, remainingTime);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkType === 'email') {
      checkEmail();
    } else {
      checkPassword();
    }
  };

  const validation = isValidEmail(email.trim());
  const isEmailValid = email.trim() && validation.isValid;
  const isPasswordValid = password.trim().length > 0;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Security Check
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check if your email or password has been exposed in data breaches.
          </p>
        </div>

        {/* Total Scans Counter */}
        <div className="card max-w-md mx-auto mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center justify-center space-x-3">
            <Users className="h-6 w-6 text-primary" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Security Scans</p>
              <p className="text-3xl font-bold">{totalScans.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Main Check Tool */}
        <div className="card max-w-2xl mx-auto mb-12">
          {/* Check Type Selector */}
          <div className="flex mb-6 bg-muted rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setCheckType('email');
                setResult(null);
                setPasswordResult(null);
                setEmailError('');
                setPasswordError('');
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                checkType === 'email' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Email Check</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCheckType('password');
                setResult(null);
                setPasswordResult(null);
                setEmailError('');
                setPasswordError('');
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                checkType === 'password' 
                  ? 'bg-background shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Key className="h-4 w-4" />
              <span>Password Check</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {checkType === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address..."
                    className={`input-field pr-12 ${emailError ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                {emailError && (
                  <p className="text-destructive text-sm mt-2">
                    {emailError}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordResult) setPasswordResult(null);
                      setPasswordError('');
                    }}
                    placeholder="Enter your password..."
                    className={`input-field pr-12 ${passwordError ? 'border-destructive' : ''}`}
                    disabled={isLoading}
                  />
                  <Key className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                {passwordError && (
                  <p className="text-destructive text-sm mt-2">
                    {passwordError}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Your password is hashed locally and never transmitted in plain text.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || (checkType === 'email' ? !isEmailValid : !isPasswordValid)}
              className="w-full btn-primary py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>
                    {checkType === 'email' ? 'Scanning Databases...' : 'Checking Password...'}
                  </span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>
                    {checkType === 'email' ? 'Check for Breaches' : 'Check Password'}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Loading Animation */}
          {isLoading && (
            <div className="mt-8 text-center">
              <div className="border rounded-lg p-6">
                <p className="text-muted-foreground mb-4">
                  {checkType === 'email' 
                    ? 'Checking against 500+ breach databases...' 
                    : 'Analyzing password against compromised databases...'}
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && !isLoading && checkType === 'email' && (
            <div>
              <ResultCard result={result} />
              <ShareResult email={email} />
            </div>
          )}

          {passwordResult && !isLoading && checkType === 'password' && (
            <div>
              <PasswordResultCard result={passwordResult} />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Email: Check against 500+ known data breaches</li>
              <li>• Password: Use k-anonymity to check compromised passwords</li>
              <li>• Data is processed securely with privacy protection</li>
              <li>• Results include dark web monitoring simulation</li>
              <li>• Real-time breach database integration when available</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Stay Protected</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Use unique, strong passwords for each account</li>
              <li>• Enable two-factor authentication when available</li>
              <li>• Monitor your accounts regularly for suspicious activity</li>
              <li>• Keep your software and devices updated</li>
              <li>• Change passwords immediately if found in breaches</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;
