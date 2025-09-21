
import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RiskSummaryProps {
  domain: string;
  riskLevel: 'low' | 'medium' | 'high';
  scanTime: number;
  checksPerformed?: number;
}

const RiskSummary: React.FC<RiskSummaryProps> = ({
  domain,
  riskLevel,
  scanTime,
  checksPerformed = 8
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-green-400 bg-green-400/10 border-green-400/20';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'medium': return <Shield className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Security Analysis for {domain}</h2>
          <Badge className={`${getRiskColor(riskLevel)} border`}>
            {getRiskIcon(riskLevel)}
            <span className="ml-2 capitalize">{riskLevel} Risk</span>
          </Badge>
        </div>
        <p className="text-gray-400">
          Comprehensive scan completed in {scanTime}ms • {checksPerformed} security checks performed • Domain validated and verified
        </p>
      </CardContent>
    </Card>
  );
};

export default RiskSummary;
