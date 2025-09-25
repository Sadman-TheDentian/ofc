
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Copy, Server } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GeneratedConfigPage() {
  const searchParams = useSearchParams();
  const config = searchParams.get('config');
  const { toast } = useToast();

  const handleCopy = () => {
    if (config) {
      navigator.clipboard.writeText(config);
      toast({
        title: 'Copied to Clipboard',
        description: 'The firewall configuration has been copied.',
      });
    }
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Server className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-2xl">Generated Firewall Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Copy the commands below and run them on your server to apply the new firewall rules.
            </p>
            <div className="relative bg-black/50 rounded-lg p-4 font-mono text-sm border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <pre className="whitespace-pre-wrap break-all text-white">
                <code>{config || '# No configuration generated.'}</code>
              </pre>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild>
                <Link href="/tools/cloud-firewall">Back to Firewall Tool</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
