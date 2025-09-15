"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import type { AIPoweredThreatMonitoringOutput } from "@/ai/flows/ai-powered-threat-monitoring";
import { analyzeThreats } from "./actions";

const FormSchema = z.object({
  securityNews: z.string().min(50, {
    message: "Security news must be at least 50 characters.",
  }),
});

const exampleNews = `Title: Major SaaS Provider "ConnectSphere" Reports Data Breach, User Passwords and API Keys Exposed

Date: October 26, 2023

A popular software-as-a-service (SaaS) provider, ConnectSphere, has confirmed a significant data breach affecting millions of its users. The company, which provides project management and collaboration tools, announced that a threat actor gained unauthorized access to its production database earlier this month.

The compromised data includes user email addresses, salted and hashed passwords, and, for a subset of users, active API keys. ConnectSphere's initial investigation reveals that the attacker exploited a previously unknown vulnerability in a third-party library used by their platform.

ConnectSphere is forcing a password reset for all users and has invalidated all exposed API keys. The company is urging its customers, especially those who reuse passwords across different services, to change their credentials on other platforms immediately. Security teams at companies using ConnectSphere are advised to audit their systems for any unusual activity related to the exposed API keys. DentiSystems is a known user of ConnectSphere for internal project tracking.
`;

export default function ThreatMonitorPage() {
  const [result, setResult] = useState<AIPoweredThreatMonitoringOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        securityNews: "",
    }
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);

    const threatResult = await analyzeThreats({
      organizationName: "DentiSystems",
      securityNews: data.securityNews,
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
          Analyze security news articles or intelligence reports to identify
          potential threats to your organization.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="securityNews"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-baseline">
                        <FormLabel>Security News / Report</FormLabel>
                        <Button type="button" variant="link" size="sm" className="p-0 h-auto" onClick={() => form.setValue('securityNews', exampleNews)}>Use Example</Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Paste security news content here..."
                        className="min-h-[250px] font-mono text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Analyze for Threats
              </Button>
            </form>
          </Form>
        </div>
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                  <p>AI is analyzing the report...</p>
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
                      <AlertTitle className="font-headline text-primary">No Threat Detected</AlertTitle>
                      <AlertDescription>
                        The provided report does not appear to pose a direct
                        threat to your organization.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
               {!isLoading && !result && (
                <div className="text-center text-muted-foreground p-8">
                  <p>Your threat analysis will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
