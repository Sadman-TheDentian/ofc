
import React from 'react';
import { Github, Globe, Server, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import MetricCard from './MetricCard';

interface ScanResult {
  githubMentions: number;
  githubRepos?: Array<{ name: string; url: string; description: string }>;
  subdomains?: string[];
  dnsInfo?: {
    hasARecord: boolean;
    securityRecords: number;
  };
  whoisInfo?: {
    registrar: string;
    domainAge: number;
    privacyProtected: boolean;
  };
}

interface AdditionalMetricsProps {
  scanResult: ScanResult;
}

const AdditionalMetrics: React.FC<AdditionalMetricsProps> = ({ scanResult }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        icon={<Github className="h-6 w-6 text-purple-400 mr-3" />}
        title="GitHub Mentions"
        value={scanResult.githubMentions}
        description="Public repositories mentioning domain"
        items={scanResult.githubRepos?.map(repo => ({ 
          name: repo.name, 
          url: repo.url 
        })) || []}
      />

      <MetricCard
        icon={<Globe className="h-6 w-6 text-cyan-400 mr-3" />}
        title="Subdomains"
        value={scanResult.subdomains?.length || 0}
        description="Discovered via certificate transparency"
        items={scanResult.subdomains?.map(subdomain => ({ text: subdomain })) || []}
      />

      <MetricCard
        icon={<Server className="h-6 w-6 text-green-400 mr-3" />}
        title="DNS Records"
        value={scanResult.dnsInfo?.securityRecords || 0}
        description="Security-related DNS records"
        badges={[{
          text: scanResult.dnsInfo?.hasARecord ? 'A Record Found' : 'No A Record',
          variant: scanResult.dnsInfo?.hasARecord ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
        }]}
      />

      <MetricCard
        icon={<Clock className="h-6 w-6 text-yellow-400 mr-3" />}
        title="Domain Age"
        value={scanResult.whoisInfo?.domainAge || 'Unknown'}
        description="Years since registration"
        items={scanResult.whoisInfo ? [
          { text: `Registrar: ${scanResult.whoisInfo.registrar}` }
        ] : []}
        badges={scanResult.whoisInfo?.privacyProtected ? [{
          text: 'Privacy Protected',
          variant: 'bg-blue-600/20 text-blue-400 text-xs'
        }] : []}
      />
    </div>
  );
};

export default AdditionalMetrics;
