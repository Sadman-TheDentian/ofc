
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold mb-4">Welcome Back, Operator</h1>
      <p className="text-muted-foreground mb-8">Here's a snapshot of your security posture and tools.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-gradient-to-br from-accent to-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground">
              New critical alert detected
            </p>
             <Button variant="link" size="sm" asChild className="p-0 h-auto mt-2">
                <Link href="/dashboard/threat-monitor">
                    View Alert <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
             </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">PRO Plan</div>
            <p className="text-xs text-muted-foreground">
              All tools and API access unlocked.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Usage</CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 / 10,000</div>
            <p className="text-xs text-muted-foreground">
              requests used this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-headline text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
             <Link href="/dashboard/threat-monitor">
                <Card className="hover:border-primary/50 transition-colors h-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-primary"/>
                            AI Threat Monitor
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Analyze news for organizational threats.</p>
                    </CardContent>
                </Card>
            </Link>
             <Link href="/tools/phishrisk">
                <Card className="hover:border-primary/50 transition-colors h-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                        Launch PhishRisk Sim
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Test your team's phishing awareness.</p>
                    </CardContent>
                </Card>
            </Link>
            <Link href="/dashboard/api-keys">
                 <Card className="hover:border-primary/50 transition-colors h-full">
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                        Manage API Keys
                        </CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-sm text-muted-foreground">Generate or revoke API credentials.</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
      </div>
    </div>
  );
}
