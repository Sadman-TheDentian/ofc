
import { AlertTriangle, CheckCircle, Shield, Eye } from 'lucide-react';
import type { PasswordResult } from '../lib/breachCheck';

interface PasswordResultCardProps {
  result: PasswordResult;
}

const PasswordResultCard = ({ result }: PasswordResultCardProps) => {
  return (
    <div className="mt-8">
      {result.compromised ? (
        <div className="cyber-border rounded-lg p-6 border-destructive bg-destructive/10">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Password Compromised!
              </h3>
              <p className="text-destructive/90 mb-4">{result.message}</p>
              
              {result.riskLevel && (
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  result.riskLevel === 'critical' ? 'bg-red-900/50 text-red-200 border border-red-700' :
                  result.riskLevel === 'high' ? 'bg-orange-900/50 text-orange-200 border border-orange-700' :
                  result.riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-200 border border-yellow-700' :
                  'bg-blue-900/50 text-blue-200 border border-blue-700'
                }`}>
                  Risk Level: {result.riskLevel.toUpperCase()}
                </div>
              )}

              {result.exposureCount && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">Exposure Details</span>
                  </div>
                  <p className="text-xs text-destructive/80">
                    This password has been seen {result.exposureCount.toLocaleString()} times in data breaches.
                    The higher the count, the more likely it is to be used in automated attacks.
                  </p>
                </div>
              )}

              <div className="mt-6 p-4 bg-destructive/5 rounded-lg">
                <h4 className="font-medium text-destructive mb-2">Immediate Actions Required:</h4>
                <ul className="text-sm text-destructive/90 space-y-1">
                  <li>• Change this password immediately on all accounts</li>
                  <li>• Use a unique, strong password for each account</li>
                  <li>• Enable two-factor authentication where possible</li>
                  <li>• Consider using a password manager</li>
                  <li>• Monitor accounts for any suspicious activity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cyber-border rounded-lg p-6 border-primary bg-primary/10">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Password Secure!
              </h3>
              <p className="text-primary/90">{result.message}</p>
              <p className="text-sm text-primary/70 mt-2">
                This password was not found in known compromise databases.
              </p>
              
              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Security Tips</span>
                </div>
                <ul className="text-xs text-primary/80 space-y-1">
                  <li>• Keep using unique passwords for each account</li>
                  <li>• Regularly update your passwords</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Use a reputable password manager</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordResultCard;
