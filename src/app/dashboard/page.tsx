
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KeyRound, ShieldHalf } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold mb-4">
        Welcome Back, Operator
      </h1>
      <p className="text-muted-foreground mb-8">
        Here's a snapshot of your security posture and tools.
      </p>

      <div>
        <h2 className="font-headline text-xl font-bold mb-4">Code Security Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/code-leak-detector">
            <Card className="hover:border-primary/50 transition-colors h-full bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  AI Code Leak Detector
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Scan code snippets for hardcoded secrets.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/code-scanner">
             <Card className="hover:border-primary/50 transition-colors h-full bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                   <ShieldHalf className="h-5 w-5 text-primary" />
                  AI Code Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyze code for common vulnerabilities.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
