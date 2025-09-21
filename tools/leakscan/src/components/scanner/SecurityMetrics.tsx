
import React from 'react';
import { Mail, Lock, Shield, FileText } from 'lucide-react';
import MetricCard from './MetricCard';

interface ScanResult {
  emailsExposed: number;
  emailBreaches?: string[];
  adminPanelsFound: string[];
  sslInfo?: {
    grade: string;
    hasSSL: boolean;
    issues: string[];
  };
  securityHeaders?: {
    score: number;
    missing: string[];
  };
}

interface SecurityMetricsProps {
  scanResult: ScanResult;
}

const SecurityMetrics: React.FC<SecurityMetricsProps> = ({ scanResult }) => {
  const getSSLGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={<Mail className="h-6 w-6 text-blue-400 mr-3" />}
        title="Email Exposures"
        value={scanResult.emailsExposed}
        description={scanResult.emailsExposed === 0 
          ? 'No exposed emails found' 
          : 'Emails from this domain found in breaches'}
        items={scanResult.emailBreaches?.map(breach => ({ text: breach })) || []}
      />

      <MetricCard
        icon={<Lock className="h-6 w-6 text-green-400 mr-3" />}
        title="SSL Certificate"
        value={scanResult.sslInfo?.grade || 'Unknown'}
        description={scanResult.sslInfo?.hasSSL ? 'SSL Certificate Active' : 'No SSL Certificate'}
        items={scanResult.sslInfo?.issues?.map(issue => ({ text: issue })) || []}
        className={`text-3xl font-bold mb-2 ${getSSLGradeColor(scanResult.sslInfo?.grade || 'Unknown')}`}
      />

      <MetricCard
        icon={<Shield className="h-6 w-6 text-orange-400 mr-3" />}
        title="Admin Panels"
        value={scanResult.adminPanelsFound.length}
        description={scanResult.adminPanelsFound.length === 0 
          ? 'No exposed admin panels' 
          : 'Potentially accessible admin panels'}
        items={scanResult.adminPanelsFound.map(panel => ({ text: panel }))}
      />

      <MetricCard
        icon={<FileText className="h-6 w-6 text-purple-400 mr-3" />}
        title="Security Headers"
        value={`${scanResult.securityHeaders?.score.toFixed(0) || '0'}%`}
        description="Security headers coverage"
        items={scanResult.securityHeaders?.missing?.map(header => ({ text: `Missing: ${header}` })) || []}
      />
    </div>
  );
};

export default SecurityMetrics;
