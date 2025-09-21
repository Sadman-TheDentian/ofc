
import React from 'react';
import { Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProFeatures: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-green-600/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Lock className="h-6 w-6 text-green-400 mr-3" />
            <h3 className="text-xl font-bold text-white">PRO Features</h3>
          </div>
          <Badge className="bg-green-600 text-white">Coming Soon</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">Deep Vulnerability Analysis</h4>
            <p className="text-gray-400 text-sm">Detailed CVE analysis and exploit availability</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">Continuous Monitoring</h4>
            <p className="text-gray-400 text-sm">24/7 monitoring with instant breach alerts</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">API Access & Automation</h4>
            <p className="text-gray-400 text-sm">Automated scanning with detailed reporting</p>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Unlock PRO (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProFeatures;
