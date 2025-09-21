
import React, { useState, useEffect } from 'react';
import { Shield, Plus, Trash2, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiService, MonitoredPassword } from '../services/api';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import CryptoJS from 'crypto-js';

const MonitoringDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [monitoredPasswords, setMonitoredPasswords] = useState<MonitoredPassword[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordLabel, setNewPasswordLabel] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (user?.tier === 'pro') {
      loadMonitoredPasswords();
    }
  }, [user]);

  const loadMonitoredPasswords = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getMonitoredPasswords();
      setMonitoredPasswords(data.monitoredPasswords);
    } catch (error) {
      console.error('Failed to load monitored passwords:', error);
      toast({
        title: 'Error',
        description: 'Failed to load monitored passwords',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addPasswordToMonitoring = async () => {
    if (!newPassword.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a password',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsAdding(true);
      
      // Hash the password with SHA-1 for HIBP compatibility
      const hashedPassword = CryptoJS.SHA1(newPassword).toString().toUpperCase();
      
      await apiService.addPasswordToMonitoring(hashedPassword, newPasswordLabel.trim() || undefined);
      
      toast({
        title: 'Success',
        description: 'Password added to monitoring'
      });
      
      setNewPassword('');
      setNewPasswordLabel('');
      setShowAddModal(false);
      loadMonitoredPasswords();
    } catch (error) {
      console.error('Failed to add password:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add password to monitoring',
        variant: 'destructive'
      });
    } finally {
      setIsAdding(false);
    }
  };

  const removePasswordFromMonitoring = async (monitoringId: string) => {
    try {
      await apiService.removePasswordFromMonitoring(monitoringId);
      toast({
        title: 'Success',
        description: 'Password removed from monitoring'
      });
      loadMonitoredPasswords();
    } catch (error) {
      console.error('Failed to remove password:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove password from monitoring',
        variant: 'destructive'
      });
    }
  };

  const getRiskBadge = (breachCount: number) => {
    if (breachCount === 0) {
      return <Badge className="bg-green-600 text-white">Safe</Badge>;
    } else if (breachCount <= 10) {
      return <Badge className="bg-yellow-600 text-white">Medium Risk</Badge>;
    } else if (breachCount <= 100) {
      return <Badge className="bg-orange-600 text-white">High Risk</Badge>;
    } else {
      return <Badge className="bg-red-600 text-white">Critical</Badge>;
    }
  };

  if (user?.tier !== 'pro') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Shield className="h-16 w-16 text-green-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Password Monitoring Dashboard</h1>
        <p className="text-gray-300 mb-8">
          Upgrade to PRO to access continuous password monitoring and breach alerts.
        </p>
        <a
          href="/pricing"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Upgrade to PRO
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Password Monitoring Dashboard</h1>
          <p className="text-gray-300">
            Monitor your passwords for new breaches and receive instant alerts.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Password
        </button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-semibold">Total Monitored</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">{monitoredPasswords.length}</p>
        </div>
        
        <div className="bg-gray-800 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h3 className="text-lg font-semibold">Breached</h3>
          </div>
          <p className="text-3xl font-bold text-red-400">
            {monitoredPasswords.filter(p => p.breachCountLastCheck > 0).length}
          </p>
        </div>
        
        <div className="bg-gray-800 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-semibold">Safe</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">
            {monitoredPasswords.filter(p => p.breachCountLastCheck === 0).length}
          </p>
        </div>
      </div>

      {/* Monitored Passwords List */}
      <div className="bg-gray-800 border border-green-500/20 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Monitored Passwords</h2>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center text-gray-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
            Loading monitored passwords...
          </div>
        ) : monitoredPasswords.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No passwords being monitored yet.</p>
            <p className="text-sm mt-2">Add passwords to start monitoring for breaches.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {monitoredPasswords.map((password) => (
              <div key={password.id} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">
                      {password.passwordLabel || 'Unlabeled Password'}
                    </h3>
                    {getRiskBadge(password.breachCountLastCheck)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      {password.breachCountLastCheck} breaches found
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Last checked: {new Date(password.lastChecked).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removePasswordFromMonitoring(password.id)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Remove from monitoring"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Password Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-green-500/20 rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Add Password to Monitoring</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Password Label (Optional)</label>
                <input
                  type="text"
                  value={newPasswordLabel}
                  onChange={(e) => setNewPasswordLabel(e.target.value)}
                  placeholder="e.g., Gmail, Work Account, Social Media"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter the password to monitor"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Your password is hashed before being sent and never stored in plain text.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                disabled={isAdding}
              >
                Cancel
              </button>
              <button
                onClick={addPasswordToMonitoring}
                disabled={isAdding}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {isAdding ? 'Adding...' : 'Add to Monitoring'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringDashboard;
