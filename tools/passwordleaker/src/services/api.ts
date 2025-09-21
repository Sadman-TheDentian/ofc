
// API service for Password Monitoring System - Production Ready

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://password-leaker-api.darkdenti44.workers.dev';
const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';

console.log('🚀 API Base URL:', API_BASE_URL);

export interface User {
  email: string;
  tier: 'free' | 'pro';
  paymentStatus: 'pending' | 'active' | 'expired' | 'cancelled';
  dailyChecks?: number;
  lastCheckDate?: string;
  memberSince?: string;
}

export interface MonitoredPassword {
  id: string;
  passwordHash: string;
  passwordLabel?: string;
  breachCountLastCheck: number;
  createdAt: string;
  lastChecked: string;
}

export interface PasswordCheckResult {
  isBreached: boolean;
  breachCount: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  remainingChecks?: number | 'unlimited';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ChargeInfo {
  id: string;
  hosted_url: string;
  pricing: {
    local: {
      amount: string;
      currency: string;
    };
  };
  expires_at: string;
}

export interface ApiError {
  error: string;
  reason?: string;
  resetTime?: number;
  remaining?: number;
}

class APIService {
  private token: string | null = null;
  private baseUrl: string;

  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.baseUrl = API_BASE_URL;
    
    if (DEBUG_MODE) {
      console.log('API Service initialized with base URL:', this.baseUrl);
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (DEBUG_MODE) {
      console.log('API Response:', response.status, response.statusText);
    }

    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      
      // Handle specific error types
      if (response.status === 429) {
        const resetTime = errorData.resetTime ? new Date(errorData.resetTime).toLocaleString() : 'later';
        throw new Error(`Rate limit exceeded. Try again ${resetTime}. ${errorData.reason || ''}`);
      }
      
      if (response.status === 401) {
        this.logout(); // Clear invalid token
        throw new Error('Your session has expired. Please log in again.');
      }
      
      if (response.status === 403) {
        throw new Error('PRO subscription required for this feature. Upgrade to continue.');
      }

      if (response.status === 404) {
        throw new Error('Service not found. Please check your connection.');
      }

      if (response.status >= 500) {
        throw new Error('Server error. Please try again in a few moments.');
      }
      
      throw new Error(errorData.error || 'Request failed');
    }

    try {
      return await response.json();
    } catch {
      throw new Error('Invalid response from server');
    }
  }

  async checkPassword(password: string): Promise<PasswordCheckResult> {
    try {
      if (DEBUG_MODE) {
        console.log('Checking password');
      }

      const response = await fetch(`${this.baseUrl}/api/check`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ password })
      });

      if (response.status === 429) {
        const data = await response.json();
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      const result = await this.handleResponse<{success: boolean, data: PasswordCheckResult}>(response);
      return result.data;
    } catch (error) {
      console.error('Password check failed:', error);
      throw error;
    }
  }

  async authenticate(email: string, paymentCode?: string): Promise<AuthResponse> {
    try {
      if (DEBUG_MODE) {
        console.log('Authenticating user:', email, 'with payment code:', !!paymentCode);
      }

      const response = await fetch(`${this.baseUrl}/api/auth`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, paymentCode }),
      });

      const authData = await this.handleResponse<AuthResponse>(response);
      this.token = authData.token;
      localStorage.setItem('auth_token', this.token);

      if (DEBUG_MODE) {
        console.log('Authentication successful:', authData.user.tier);
      }

      return authData;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }

  async addPasswordToMonitoring(passwordHash: string, label?: string): Promise<{ success: boolean; monitoringId: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/monitor`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ passwordHash, label }),
      });

      return await this.handleResponse<{ success: boolean; monitoringId: string }>(response);
    } catch (error) {
      console.error('Failed to add password to monitoring:', error);
      throw error;
    }
  }

  async getMonitoredPasswords(): Promise<{ monitoredPasswords: MonitoredPassword[] }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/monitored`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      return await this.handleResponse<{ monitoredPasswords: MonitoredPassword[] }>(response);
    } catch (error) {
      console.error('Failed to get monitored passwords:', error);
      throw error;
    }
  }

  async removePasswordFromMonitoring(monitoringId: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/monitor/${monitoringId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      return await this.handleResponse<{ success: boolean }>(response);
    } catch (error) {
      console.error('Failed to remove password from monitoring:', error);
      throw error;
    }
  }

  async createPaymentCharge(): Promise<{ success: boolean; charge?: ChargeInfo; error?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/create-charge`, {
        method: 'POST',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment charge');
      }

      const data = await response.json();
      return {
        success: true,
        charge: data.charge
      };
    } catch (error) {
      console.error('Create payment charge failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create payment charge'
      };
    }
  }

  // Legacy method for backward compatibility - now creates a payment charge
  async activatePro(): Promise<{ success: boolean; charge?: ChargeInfo; error?: string }> {
    return this.createPaymentCharge();
  }

  async refreshUserData(): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/api/user`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const result = await this.handleResponse<{success: boolean, data: User}>(response);
      const userData = result.data;
      
      // Update stored user data
      localStorage.setItem('user_email', userData.email);
      localStorage.setItem('user_tier', userData.tier);
      localStorage.setItem('payment_status', userData.paymentStatus);

      return userData;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<{ status: string; timestamp: string; version: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      return await this.handleResponse<{ status: string; timestamp: string; version: string }>(response);
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_tier');
    localStorage.removeItem('payment_status');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getStoredToken(): string | null {
    return this.token;
  }

  getApiBaseUrl(): string {
    return this.baseUrl;
  }

  // Test connection to API
  async testConnection(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

export const apiService = new APIService();
