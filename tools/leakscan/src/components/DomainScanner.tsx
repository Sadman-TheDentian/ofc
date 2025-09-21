
import React, { useState } from 'react';
import ScanInput from './scanner/ScanInput';
import ScanProgress from './scanner/ScanProgress';
import ScanResults from './scanner/ScanResults';
import { 
  checkHaveIBeenPwned, 
  checkGitHubMentions, 
  checkAdminPanels,
  checkCertificateTransparency,
  checkDNSRecords,
  checkSSLCertificate,
  checkWHOISInfo,
  checkSecurityHeaders
} from '@/services/apiServices';
import { validateDomain } from '@/services/domainValidation';
import { scanCache } from '@/utils/cache';
import { useToast } from '@/hooks/use-toast';

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

const DomainScanner = () => {
  const [domain, setDomain] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');
  const [scanProgress, setScanProgress] = useState({ current: 0, total: 0, stage: '' });
  const { toast } = useToast();

  const validateDomainFormat = (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
  };

  const updateProgress = (current: number, total: number, stage: string) => {
    setScanProgress({ current, total, stage });
  };

  const scanDomain = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain');
      return;
    }

    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').toLowerCase();
    
    if (!validateDomainFormat(cleanDomain)) {
      setError('Please enter a valid domain (e.g., example.com)');
      return;
    }

    // Check cache first
    const cacheKey = `scan_${cleanDomain}`;
    const cachedResult = scanCache.get(cacheKey);
    if (cachedResult) {
      setScanResult(cachedResult);
      return;
    }

    setIsScanning(true);
    setError('');
    setScanResult(null);
    
    const startTime = Date.now();
    const totalSteps = 8;

    try {
      updateProgress(1, totalSteps, 'Validating domain existence...');
      
      // Real-time domain validation
      const validation = await validateDomain(cleanDomain);
      
      if (!validation.isValid) {
        throw new Error(validation.error || 'Domain does not exist or is not accessible');
      }

      if (!validation.exists) {
        throw new Error('Domain does not exist in DNS records');
      }

      toast({
        title: "Domain Validated",
        description: `${cleanDomain} exists and is reachable. Starting security scan...`,
      });

      updateProgress(2, totalSteps, 'Checking email breaches...');
      const breachData = await checkHaveIBeenPwned(cleanDomain);

      updateProgress(3, totalSteps, 'Scanning for admin panels...');
      const adminPanels = await checkAdminPanels(cleanDomain);

      updateProgress(4, totalSteps, 'Searching GitHub mentions...');
      const githubData = await checkGitHubMentions(cleanDomain);

      updateProgress(5, totalSteps, 'Checking certificate transparency...');
      const certData = await checkCertificateTransparency(cleanDomain);

      updateProgress(6, totalSteps, 'Analyzing DNS records...');
      const dnsData = await checkDNSRecords(cleanDomain);

      updateProgress(7, totalSteps, 'Checking SSL certificate...');
      const sslData = await checkSSLCertificate(cleanDomain);

      updateProgress(8, totalSteps, 'Checking security headers...');
      const securityHeadersData = await checkSecurityHeaders(cleanDomain);

      const scanTime = Date.now() - startTime;

      // Calculate risk level based on available data
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      let riskFactors = 0;

      if (breachData && breachData.count > 5) riskFactors++;
      if (adminPanels && adminPanels.length > 0) riskFactors++;
      if (githubData && githubData.count > 15) riskFactors++;
      if (sslData && !sslData.hasSSL) riskFactors += 2;
      if (securityHeadersData && securityHeadersData.score < 50) riskFactors++;

      if (riskFactors >= 3) {
        riskLevel = 'high';
      } else if (riskFactors >= 1) {
        riskLevel = 'medium';
      }

      const result: ScanResult = {
        domain: cleanDomain,
        emailsExposed: breachData?.count || 0,
        emailBreaches: breachData?.breaches || [],
        adminPanelsFound: adminPanels || [],
        githubMentions: githubData?.count || 0,
        githubRepos: githubData?.repositories || [],
        subdomains: certData?.subdomains || [],
        certificateCount: certData?.certificateCount || 0,
        dnsInfo: dnsData || undefined,
        sslInfo: sslData || undefined,
        whoisInfo: undefined, // WHOIS requires backend implementation
        securityHeaders: securityHeadersData || undefined,
        riskLevel,
        scanTime
      };

      setScanResult(result);
      
      // Cache the result for 30 minutes
      scanCache.set(cacheKey, result, 30);

      toast({
        title: "Scan Complete",
        description: `Security analysis completed for ${cleanDomain} in ${scanTime}ms`,
      });

    } catch (err: any) {
      const errorMessage = err.message || 'Failed to scan domain. Please verify the domain exists and try again.';
      setError(errorMessage);
      toast({
        title: "Scan Failed",
        description: errorMessage,
        variant: "destructive"
      });
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
      setScanProgress({ current: 0, total: 0, stage: '' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <ScanInput
        domain={domain}
        setDomain={setDomain}
        isScanning={isScanning}
        error={error}
        onScan={scanDomain}
      />

      <ScanProgress
        isVisible={isScanning}
        current={scanProgress.current}
        total={scanProgress.total}
        stage={scanProgress.stage}
      />

      {scanResult && <ScanResults scanResult={scanResult} />}
    </div>
  );
};

export default DomainScanner;
