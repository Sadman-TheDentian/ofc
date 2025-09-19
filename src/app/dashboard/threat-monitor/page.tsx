"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldAlert, ShieldCheck, Newspaper } from "lucide-react";
import type { AIPoweredThreatMonitoringOutput } from "@/ai/flows/ai-powered-threat-monitoring";
import { analyzeThreats } from "./actions";

export default function ThreatMonitorPage() {
  const [result, setResult] = useState<AIPoweredThreatMonitoringOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalysis() {
    setIsLoading(true);
    setResult(null);

    const threatResult = await analyzeThreats({
      organizationName: "DentiSystems",
    });
    
    setResult(threatResult);
    setIsLoading(false);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold">
          AI-Powered Threat Monitor
        </h1>
        <p className="text-muted-foreground mt-1">
          Trigger an automated AI agent to fetch the latest security news and analyze it for potential threats to your organization.
        </p>
      </div>
      
      <div className="flex justify-center mb-12">
        <Button size="lg" onClick={handleAnalysis} disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                </>
            ) : (
                <>
                    <ShieldAlert className="mr-2 h-5 w-5" />
                    Scan for Threats Now
                </>
            )}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          <Card className="md:col-span-1 bg-gradient-to-br from-card to-card/80 border-border/50">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
              <CardDescription>The AI's assessment based on the latest news will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                  <p className="font-semibold">AI Agent is running...</p>
                  <p className="text-sm">Fetching and analyzing security news.</p>
                </div>
              )}
              {result && (
                <div>
                  {result.threatDetected ? (
                    <Alert variant="destructive">
                      <ShieldAlert className="h-4 w-4" />
                      <AlertTitle className="font-headline">Threat Detected!</AlertTitle>
                      <AlertDescription>
                        {result.alertMessage}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <ShieldCheck className="h-4 w-4" />
                      <AlertTitle className="font-headline text-primary">No Immediate Threat Detected</AlertTitle>
                      <AlertDescription>
                        The automated scan did not find any direct mentions or immediate threats to your organization in the latest news.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
               {!isLoading && !result && (
                <div className="text-center text-muted-foreground p-8">
                  <p>Click "Scan for Threats" to begin the analysis.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
           <Card className="md:col-span-1 bg-gradient-to-br from-card to-card/80 border-border/50">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Newspaper className="h-6 w-6 text-primary" />
                    <CardTitle>Analyzed Source Material</CardTitle>
                </div>
              <CardDescription>This is the content the AI agent analyzed.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                  <Loader2 className="h-8 w-8 animate-spin mb-4" />
                  <p>Fetching news...</p>
                </div>
              )}
              {result?.sourceNews ? (
                <div className="prose prose-sm prose-invert max-w-none text-muted-foreground bg-secondary/30 p-4 rounded-md max-h-80 overflow-auto">
                    <pre className="whitespace-pre-wrap font-mono text-xs">{result.sourceNews}</pre>
                </div>
              ) : (
                 !isLoading && <p className="text-muted-foreground text-center p-8">Source material will be displayed here after analysis.</p>
              )}
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
