
import React from 'react';
import { Search, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface ScanInputProps {
  domain: string;
  setDomain: (domain: string) => void;
  isScanning: boolean;
  error: string;
  onScan: () => void;
}

const ScanInput: React.FC<ScanInputProps> = ({
  domain,
  setDomain,
  isScanning,
  error,
  onScan
}) => {
  return (
    <Card className="bg-gray-900 border-gray-800 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter domain (e.g., example.com)"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12"
              onKeyDown={(e) => e.key === 'Enter' && onScan()}
              disabled={isScanning}
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>
          <Button 
            onClick={onScan}
            disabled={isScanning}
            className="bg-green-600 hover:bg-green-700 text-white h-12 px-8"
          >
            {isScanning ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Comprehensive Scan
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanInput;
