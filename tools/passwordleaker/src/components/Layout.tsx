import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'upgrade'>('login');

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleUpgradeClick = () => {
    navigate('/activate-pro');
  };

  const handleProActivationClick = () => {
    navigate('/activate-pro');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-xl font-bold text-white hover:text-green-400 transition-colors"
              >
                <Shield className="h-8 w-8 text-green-400" />
                <span className="bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                  Password Leaker
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.path)
                        ? 'bg-green-600/20 text-green-400'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* User Menu */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                {isAuthenticated && user ? (
                  <>
                    {user.tier === 'pro' ? (
                      <div className="flex items-center gap-2 bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        <Crown className="h-4 w-4" />
                        PRO
                      </div>
                    ) : (
                      <button
                        onClick={handleUpgradeClick}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Crown className="h-4 w-4" />
                        Upgrade to PRO
                      </button>
                    )}
                    
                    {user.tier === 'free' && (
                      <button
                        onClick={handleProActivationClick}
                        className="text-green-400 hover:text-green-300 text-sm font-medium"
                      >
                        Activate PRO
                      </button>
                    )}

                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="h-4 w-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 border-t border-green-500/20">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-green-600/20 text-green-400'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              <div className="border-t border-gray-700 pt-4">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4" />
                        {user.email}
                      </div>
                      {user.tier === 'pro' ? (
                        <div className="flex items-center gap-2 text-green-400">
                          <Crown className="h-4 w-4" />
                          PRO Account
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              handleUpgradeClick();
                              setIsMenuOpen(false);
                            }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                          >
                            <Crown className="h-4 w-4" />
                            Upgrade to PRO
                          </button>
                          <button
                            onClick={() => {
                              handleProActivationClick();
                              setIsMenuOpen(false);
                            }}
                            className="block text-green-400 hover:text-green-300 text-sm font-medium"
                          >
                            Activate PRO
                          </button>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full mt-2 px-3 py-2 text-left text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleLoginClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-green-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                Password Leaker
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Professional password breach monitoring by{' '}
              <a 
                href="https://denti.systems" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                DentiSystems
              </a>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2024 DentiSystems. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </div>
  );
};

export default Layout;