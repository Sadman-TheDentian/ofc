
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ShieldAlert, ShieldCheck, ShieldHalf } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScanCodeInputSchema, type ScanCodeInput, type ScanCodeOutput } from '@/ai/flows/code-vulnerability-scanner-types';
import { analyzeCode } from './actions';

export default function CodeScannerPage() {
  const [result, setResult] = useState<ScanCodeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ScanCodeInput>({
    resolver: zodResolver(ScanCodeInputSchema),
    defaultValues: {
      code: `const express = require('express');
const app = express();

app.get('/user-data', (req, res) => {
  const { userId } = req.query;
  // This is a vulnerable query
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  db.query(query, (err, result) => {
    res.send(result);
  });
});

app.listen(3000);`,
    },
  });

  async function onSubmit(values: ScanCodeInput) {
    setIsLoading(true);
    setResult(null);
    const analysisResult = await analyzeCode(values);
    setResult(analysisResult);
    setIsLoading(false);
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <div className="inline-block p-4 bg-secondary rounded-xl">
          <ShieldHalf className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          AI Code Vulnerability Scanner
        </h1>
        <p className="text-xl text-muted-foreground">
          Paste a code snippet below to have our AI agent analyze it for common security vulnerabilities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-2 lg:col-span-1">
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
            <CardHeader>
                <CardTitle>Code Input</CardTitle>
                <CardDescription>Enter the code you want to analyze.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="sr-only">Code Snippet</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Enter your code snippet here..."
                            className="min-h-[300px] font-mono text-xs"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                        </>
                    ) : (
                        "Scan Code"
                    )}
                    </Button>
                </form>
                </Form>
            </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
            <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
            <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>Vulnerabilities identified by the AI will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                    <p className="font-semibold">AI agent is analyzing the code...</p>
                </div>
                )}
                {result && (
                <div>
                    {result.vulnerabilities.length === 0 ? (
                    <Alert>
                        <ShieldCheck className="h-4 w-4" />
                        <AlertTitle className="text-primary">No Vulnerabilities Found</AlertTitle>
                        <AlertDescription>
                        The AI agent did not find any common vulnerabilities in the provided code snippet.
                        </AlertDescription>
                    </Alert>
                    ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {result.vulnerabilities.map((vuln, index) => (
                        <Alert key={index} variant={vuln.vulnerability === 'Analysis Failed' ? "destructive" : "default"}>
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>{vuln.vulnerability} (Line: {vuln.line})</AlertTitle>
                            <AlertDescription>{vuln.suggestion}</AlertDescription>
                        </Alert>
                        ))}
                    </div>
                    )}
                </div>
                )}
                {!isLoading && !result && (
                <div className="text-center text-muted-foreground p-8">
                    <p>Results will be displayed here after analysis.</p>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
