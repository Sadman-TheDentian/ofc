
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ShieldAlert, ShieldCheck, KeyRound } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CodeLeakDetectorInputSchema, type CodeLeakDetectorInput, type CodeLeakDetectorOutput } from '@/ai/flows/code-leak-detector';
import { analyzeCodeForLeaks } from './actions';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';

export default function CodeLeakDetectorPage() {
  const [result, setResult] = useState<CodeLeakDetectorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const form = useForm<CodeLeakDetectorInput>({
    resolver: zodResolver(CodeLeakDetectorInputSchema),
    defaultValues: {
      code: `// Example vulnerable code
const API_KEY = "da_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";
const dbPassword = "MySuperSecretPassword123!";

function connectToDatabase() {
  const user = "admin";
  const password = process.env.DB_PASSWORD || dbPassword;
  // ... connection logic
}`,
    },
  });

  async function onSubmit(values: CodeLeakDetectorInput) {
    setIsLoading(true);
    setResult(null);
    const analysisResult = await analyzeCodeForLeaks(values);
    setResult(analysisResult);
    setIsLoading(false);
  }

  if (authLoading) {
    return (
        <div className="container py-12 md:py-20 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  if (!user) {
    return (
        <div className="container py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center space-y-6 bg-secondary/30 p-8 rounded-xl border border-border">
                <KeyRound className="h-12 w-12 text-primary mx-auto" />
                <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
                    Access Denied
                </h1>
                <p className="text-xl text-muted-foreground">
                    You must be logged in to use the AI Code Leak Detector. This tool is available to all registered DentiSystems users.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/auth">Login</Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg">
                        <Link href="/pricing">View Plans</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <div className="inline-block p-4 bg-secondary rounded-xl">
          <KeyRound className="h-10 w-10 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          AI Code Leak Detector
        </h1>
        <p className="text-xl text-muted-foreground">
          Paste a code snippet below to have our AI agent analyze it for hardcoded secrets like API keys and passwords.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-2 lg:col-span-1">
            <Card className="md:col-span-1 bg-gradient-to-br from-card to-card/80 border-border/50">
            <CardHeader>
                <CardTitle>Code Input</CardTitle>
                <CardDescription>Enter the code you want to analyze for leaks.</CardDescription>
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
                            placeholder="Paste your code here..."
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
                        Scanning for Leaks...
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
                <CardDescription>Secrets identified by the AI will appear here.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                    <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                    <p className="font-semibold">AI agent is scanning the code for secrets...</p>
                </div>
                )}
                {result && (
                <div>
                    {result.leaks.length === 0 ? (
                    <Alert>
                        <ShieldCheck className="h-4 w-4" />
                        <AlertTitle className="text-primary">No Secrets Found</AlertTitle>
                        <AlertDescription>
                        The AI agent did not find any hardcoded secrets in the provided code snippet.
                        </AlertDescription>
                    </Alert>
                    ) : (
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {result.leaks.map((leak, index) => (
                        <Alert key={index} variant={leak.type === 'Analysis Failed' ? "destructive" : "default"}>
                            <ShieldAlert className="h-4 w-4" />
                            <AlertTitle>{leak.type} Detected (Line: {leak.line})</AlertTitle>
                            <AlertDescription>
                                <span className="font-mono bg-secondary px-2 py-1 rounded text-destructive/80 text-xs">{leak.secret}</span>
                            </AlertDescription>
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
