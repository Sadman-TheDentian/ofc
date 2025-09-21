
import React from 'react';
import RiskSummary from './RiskSummary';
import SecurityMetrics from './SecurityMetrics';
import AdditionalMetrics from './AdditionalMetrics';
import ProFeatures from './ProFeatures';

interface ScanResult {
  domain: string;
  emailsExposed: number;
  emailBreaches?: string[];
  adminPanelsFound: string[];
  githubMentions: number;
  githubRepos?: Array<{ name: string; url: string; description: string }>;
  subdomains?: string[];
  certificateCount?: number;
  dnsInfo?: {
    hasARecord: boolean;
    securityRecords: number;
    riskLevel: string;
  };
  sslInfo?: {
    grade: string;
    hasSSL: boolean;
    issues: string[];
  };
  whoisInfo?: {
    registrar: string;
    createdDate: string;
    domainAge: number;
    privacyProtected: boolean;
  };
  securityHeaders?: {
    headers: any;
    score: number;
    missing: string[];
  };
  riskLevel: 'low' | 'medium' | 'high';
  scanTime: number;
}

interface ScanResultsProps {
  scanResult: ScanResult;
}

const ScanResults: React.FC<ScanResultsProps> = ({ scanResult }) => {
  // Calculate how many checks actually returned data
  const checksPerformed = [
    scanResult.emailsExposed !== undefined,
    scanResult.adminPanelsFound.length !== undefined,
    scanResult.githubMentions !== undefined,
    scanResult.subdomains !== undefined,
    scanResult.dnsInfo !== undefined,
    scanResult.sslInfo !== undefined,
    scanResult.securityHeaders !== undefined
  ].filter(Boolean).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <RiskSummary 
        domain={scanResult.domain}
        riskLevel={scanResult.riskLevel}
        scanTime={scanResult.scanTime}
        checksPerformed={checksPerformed}
      />

      <SecurityMetrics scanResult={scanResult} />

      <AdditionalMetrics scanResult={scanResult} />

      <ProFeatures />
    </div>
  );
};

export default ScanResults;
