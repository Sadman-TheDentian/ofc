
import React, { useState } from 'react';
import { Check, Crown, Mail, Zap, Shield, BarChart3, Bell, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const freeFeatures = [
    '5 password checks per day',
    '30-minute cooldown between checks',
    'Basic breach detection',
    'Risk level assessment',
    'K-anonymity privacy protection'
  ];

  const proFeatures = [
    'Everything in Free',
    'Unlimited password checks',
    'No waiting time or cooldowns',
    'Detailed breach source information',
    'Historical breach timeline',
    'Bulk password checking (CSV upload)',
    'Continuous password monitoring',
    'Dark web monitoring',
    'Email/SMS breach alerts',
    'API access for developers',
    'Password strength analysis',
    'Domain monitoring for businesses',
    'Advanced security reports',
    'Export to password managers',
    'Priority email support'
  ];

  const proPrice = 9.99;

  const handleGetStartedFree = () => {
    if (isAuthenticated) {
      window.location.href = '/';
    } else {
      setShowAuthModal(true);
    }
  };

  const handleUpgradeToPro = () => {
    navigate('/activate-pro');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Choose Your <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Security Plan</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Start with our free tier and upgrade to PRO for unlimited checks and advanced security monitoring. Pay with cryptocurrency through Coinbase Commerce.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Tier */}
        <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Free</h2>
            <div className="text-4xl font-bold text-green-400 mb-2">$0</div>
            <p className="text-gray-400">Forever free</p>
          </div>

          <ul className="space-y-4 mb-8">
            {freeFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={handleGetStartedFree}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Get Started Free
          </button>
        </div>

        {/* PRO Tier */}
        <div className="bg-gradient-to-b from-green-600/20 to-gray-800 border border-green-500/40 rounded-xl p-8 relative">
          <div className="absolute top-4 right-4">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Crown className="h-4 w-4" />
              AVAILABLE NOW
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">PRO</h2>
            <div className="text-4xl font-bold text-green-400 mb-2">
              ${proPrice}
            </div>
            <p className="text-gray-400">
              One-time payment
            </p>
            <p className="text-green-400 text-sm mt-1">
              Pay with Bitcoin, Ethereum, or other cryptocurrencies
            </p>
          </div>

          <ul className="space-y-3 mb-8 max-h-80 overflow-y-auto">
            {proFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgradeToPro}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CreditCard className="h-5 w-5" />
            Pay with Crypto
          </button>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Unlimited Checks</h3>
          <p className="text-gray-400">No daily limits or waiting periods. Check as many passwords as you need.</p>
        </div>

        <div className="text-center">
          <div className="bg-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
          <p className="text-gray-400">Get instant alerts when your monitored passwords appear in new breaches.</p>
        </div>

        <div className="text-center">
          <div className="bg-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
          <p className="text-gray-400">Detailed reports and insights about your organization's password security.</p>
        </div>
      </div>

      {/* Enterprise Section */}
      <div className="mt-16 bg-gray-800 border border-green-500/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-400">Enterprise Solutions</h2>
        <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
          Need API access, bulk password checking, or custom security solutions? 
          DentiSystems offers enterprise-grade cybersecurity tools tailored to your organization's needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://denti.systems"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Explore Enterprise Tools
          </a>
          <button
            onClick={() => setShowInterestModal(true)}
            className="px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 font-semibold rounded-lg transition-colors"
          >
            Contact Sales
          </button>
        </div>
      </div>

      {/* Interest Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Contact Sales</h3>
              <p className="text-gray-300">
                Get in touch with our enterprise team for custom solutions and bulk pricing.
              </p>
            </div>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
              />
              <textarea
                placeholder="Tell us about your requirements (optional)"
                rows={3}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowInterestModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowInterestModal(false);
                    window.open('https://denti.systems/contact', '_blank');
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="login"
      />

      {/* Footer branding */}
      <div className="mt-16 text-center">
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
  );
};

export default Pricing;
