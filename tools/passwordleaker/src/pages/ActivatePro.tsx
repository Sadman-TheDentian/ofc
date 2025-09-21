
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, AlertCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { useToast } from '../hooks/use-toast';

const ActivatePro = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleActivation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive'
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // First authenticate with the email
      await login(email);
      
      // Create a payment charge
      const result = await apiService.createPaymentCharge();
      
      if (result.success && result.charge) {
        toast({
          title: 'Payment Required',
          description: 'Redirecting to payment page...',
        });
        
        // Redirect to Coinbase Commerce hosted checkout
        window.open(result.charge.hosted_url, '_blank');
        
        // Show success message and redirect to dashboard
        setTimeout(() => {
          setIsSuccess(true);
          toast({
            title: 'Payment Started',
            description: 'Complete your payment in the new tab. Your PRO features will be activated automatically.',
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Failed to initiate payment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    window.open('https://denti.systems/contact', '_blank');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 border border-green-500/20 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4 text-green-400">PRO Activated!</h1>
          <p className="text-gray-300 mb-6">
            Your account has been upgraded to PRO. You now have access to unlimited password checks and monitoring features.
          </p>
          <div className="animate-pulse text-sm text-gray-400 mb-4">
            Redirecting to dashboard...
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 border border-green-500/20 rounded-xl p-8">
        <button
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <CreditCard className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Get PRO Features</h1>
          <p className="text-gray-300">
            Enter your email to purchase PRO features with cryptocurrency.
          </p>
        </div>

        <form onSubmit={handleActivation} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-gray-400 mt-2">
              This will be your account email for PRO features
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Activating PRO...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5" />
                Start Payment Process
              </>
            )}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-300 font-medium mb-1">Need Help?</p>
                <p className="text-gray-300 mb-2">
                  If you're having trouble with the payment process, our support team is here to help.
                </p>
                <button
                  onClick={handleContactSupport}
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
                >
                  Contact Support <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {!user && (
            <div className="bg-green-600/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-2">New Customer?</h4>
              <p className="text-sm text-gray-300 mb-3">
                Purchase Password Leaker PRO to get unlimited password checks and monitoring with cryptocurrency.
              </p>
              <p className="text-xs text-gray-400">
                Secure payment via Coinbase Commerce - Bitcoin, Ethereum, and more accepted
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Password Leaker PRO by{' '}
            <a 
              href="https://denti.systems" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300"
            >
              DentiSystems
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivatePro;
