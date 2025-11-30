import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'upgrade';
}

const AuthModal = ({ isOpen, onClose, mode }: AuthModalProps) => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { email?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});
      
      await login(email);
      
      if (mode === 'upgrade') {
        toast({
          title: 'Authentication successful',
          description: 'Redirecting to PRO upgrade...',
        });
        window.location.href = '/activate-pro';
      } else {
        toast({
          title: 'Welcome!',
          description: 'You have been successfully logged in.',
        });
      }
      
      onClose();
      
    } catch (error) {
      console.error('Authentication failed:', error);
      setErrors({ 
        email: error instanceof Error ? error.message : 'Authentication failed' 
      });
      toast({
        title: 'Authentication failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {mode === 'upgrade' ? 'Start PRO Upgrade' : 'Welcome Back'}
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white p-1 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <div className="bg-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-gray-400">
              {mode === 'upgrade' 
                ? 'Enter your email to start the PRO upgrade process'
                : 'Enter your email to get started'
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none ${
                errors.email 
                  ? 'border-red-500 focus:border-red-400' 
                  : 'border-gray-600 focus:border-green-500'
              }`}
              placeholder="your.email@example.com"
              disabled={isLoading}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {mode === 'upgrade' ? 'Starting Upgrade...' : 'Signing In...'}
              </>
            ) : (
              <>
                <Mail className="h-5 w-5" />
                {mode === 'upgrade' ? 'Start PRO Upgrade' : 'Continue'}
              </>
            )}
          </button>

          {mode === 'login' && (
            <div className="text-center">
              <p className="text-xs text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}

          {mode === 'upgrade' && (
            <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                After authentication, you'll be redirected to our secure payment page to complete your PRO upgrade with cryptocurrency.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
