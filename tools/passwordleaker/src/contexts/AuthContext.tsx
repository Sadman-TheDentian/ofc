import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, paymentCode?: string) => Promise<void>;
  logout: () => void;
  upgradeToPro: (email: string, paymentCode: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log('🔧 AuthProvider rendering');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const initAuth = async () => {
      console.log('🔧 AuthProvider initialization starting');
      console.log('🔧 API Base URL:', apiService.getApiBaseUrl());
      
      // Test API connection first
      console.log('🔧 Testing API connection...');
      try {
        const connected = await apiService.testConnection();
        console.log('🔧 API Connection test result:', connected);
      } catch (error) {
        console.error('🔧 API Connection failed:', error);
      }
      
      const token = apiService.getStoredToken();
      console.log('🔧 Stored token exists:', !!token);
      
      if (token) {
        try {
          console.log('🔧 Attempting to refresh user data...');
          // Try to refresh user data from API
          const userData = await apiService.refreshUserData();
          console.log('🔧 User data refreshed successfully:', userData);
          setUser(userData);
        } catch (error) {
          console.error('🔧 Token verification failed:', error);
          // Fall back to localStorage data
          const userEmail = localStorage.getItem('user_email');
          const userTier = localStorage.getItem('user_tier') as 'free' | 'pro';
          const paymentStatus = localStorage.getItem('payment_status') as User['paymentStatus'];
          
          console.log('🔧 Fallback to localStorage:', { userEmail, userTier, paymentStatus });
          
          if (userEmail && userTier && paymentStatus) {
            setUser({
              email: userEmail,
              tier: userTier,
              paymentStatus: paymentStatus,
              dailyChecks: parseInt(localStorage.getItem('daily_checks') || '0'),
              lastCheckDate: localStorage.getItem('last_check_date') || undefined
            });
          } else {
            // Clear invalid auth state
            console.log('🔧 Clearing invalid auth state');
            apiService.logout();
          }
        }
      }
      setIsLoading(false);
      console.log('🔧 AuthProvider initialization complete');
    };

    initAuth();
  }, []);

  const login = async (email: string, paymentCode?: string) => {
    try {
      const authData = await apiService.authenticate(email, paymentCode);
      setUser(authData.user);
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user_email', authData.user.email);
      localStorage.setItem('user_tier', authData.user.tier);
      localStorage.setItem('payment_status', authData.user.paymentStatus);
      localStorage.setItem('daily_checks', (authData.user.dailyChecks || 0).toString());
      if (authData.user.lastCheckDate) {
        localStorage.setItem('last_check_date', authData.user.lastCheckDate);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  const upgradeToPro = async (email: string, paymentCode: string) => {
    try {
      const authData = await apiService.authenticate(email, paymentCode);
      setUser(authData.user);
      
      // Update stored user data
      localStorage.setItem('user_tier', authData.user.tier);
      localStorage.setItem('payment_status', authData.user.paymentStatus);
    } catch (error) {
      console.error('Upgrade failed:', error);
      throw error;
    }
  };

  const refreshUser = async () => {
    if (!apiService.isAuthenticated()) {
      return;
    }

    try {
      const userData = await apiService.refreshUserData();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Don't throw, just log the error
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    upgradeToPro,
    refreshUser
  };

  console.log('🔧 AuthProvider value:', { hasUser: !!user, isLoading, isAuthenticated: !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
