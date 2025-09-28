
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Zap, ArrowRight, ShieldAlert, Loader2, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { useState }from 'react';
import { analyzeThreats } from './threat-monitor/actions';
import { AIPoweredThreatMonitoringOutput } from '@/ai/flows/ai-powered-threat-monitoring';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const chartData = [
  { month: 'Jan', requests: 1860 },
  { month: 'Feb', requests: 3050 },
  { month: 'Mar', requests: 2370 },
  { month: 'Apr', requests: 1273 },
  { month: 'May', requests: 2009 },
  { month: 'Jun', requests: 2140 },
];

const chartConfig = {
  requests: {
    label: 'API Requests',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export default function DashboardOverviewPage() {
  const [threatResult, setThreatResult] = useState<AIPoweredThreatMonitoringOutput | null>(null);
  const [isThreatLoading, setIsThreatLoading] = useState(false);

  const handleThreatAnalysis = async () => {
    setIsThreatLoading(true);
    setThreatResult(null);
    const result = await analyzeThreats({ organizationName: "DentiSystems" });
    setThreatResult(result);
    setIsThreatLoading(false);
  }

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold mb-4">
        Welcome Back, Operator
      </h1>
      <p className="text-muted-foreground mb-8">
        Here's a snapshot of your security posture and tools.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-destructive/10 border-destructive/50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-between">
            {!threatResult && !isThreatLoading && (
              <>
                <div className="flex-grow">
                  <div className="text-2xl font-bold text-destructive">Automated Scan</div>
                  <p className="text-xs text-muted-foreground">
                    Run AI scan on latest security news.
                  </p>
                </div>
                <Button variant="destructive" size="sm" onClick={handleThreatAnalysis} className="w-full">
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Scan for Threats
                </Button>
              </>
            )}
             {isThreatLoading && (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 flex-grow">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                  <p className="font-semibold">AI Agent is running...</p>
                  <p className="text-sm">Fetching and analyzing security news.</p>
                </div>
              )}
              {threatResult && (
                <div className='flex flex-col gap-4'>
                  {threatResult.threatDetected ? (
                     <Alert variant="destructive">
                      <ShieldAlert className="h-4 w-4" />
                      <AlertTitle className="font-headline">Threat Detected!</AlertTitle>
                      <AlertDescription>
                        {threatResult.alertMessage}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <ShieldCheck className="h-4 w-4" />
                      <AlertTitle className="font-headline text-primary">No Immediate Threat Detected</AlertTitle>
                      <AlertDescription>
                        The scan did not find any immediate threats to DentiSystems.
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button variant="secondary" size="sm" onClick={() => setThreatResult(null)} className="w-full">
                    Scan Again
                  </Button>
                </div>
              )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">PRO Plan</div>
            <p className="text-xs text-muted-foreground">
              All tools and API access unlocked.
            </p>
             <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2">
              <Link href="/dashboard/subscriptions">
                Manage Subscription <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 bg-gradient-to-br from-card to-card/80 border-border/50">
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>
              {chartData.reduce((acc, item) => acc + item.requests, 0).toLocaleString()} / 10,000 requests used this month
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[120px] w-full p-0">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 0,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="requests"
                  fill="var(--color-requests)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-headline text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/threat-monitor">
            <Card className="hover:border-primary/50 transition-colors h-full bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  Threat Intel Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Review detailed threat analysis reports.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/tools/phishrisk">
            <Card className="hover:border-primary/50 transition-colors h-full bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Launch PhishRisk Sim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Test your team's phishing awareness.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/api-keys">
            <Card className="hover:border-primary/50 transition-colors h-full bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  Manage API Keys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Generate or revoke API credentials.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/tools/code-scanner">
             <Card className="hover:border-primary/50 transition-colors h-full bg-gradient-to-br from-card to-card/80 border-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  Scan Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Analyze code snippets for vulnerabilities.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
