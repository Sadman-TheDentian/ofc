
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { verifyPaymentAndUpgrade } from '../subscriptions/actions';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const chargeCode = searchParams.get('code');

    if (authLoading) {
      return; // Wait for user data to be available
    }

    if (!user) {
      // If user is not logged in, redirect them to login. They'll be redirected back here.
      router.push('/auth');
      return;
    }
    
    if (!chargeCode) {
      setErrorMessage('No payment charge code found.');
      setStatus('error');
      return;
    }

    const verify = async () => {
      const result = await verifyPaymentAndUpgrade(chargeCode, user.uid);
      if (result.success) {
        setStatus('success');
        if (result.apiKey) {
            setApiKey(result.apiKey);
        }
      } else {
        setErrorMessage(result.error || 'An unknown error occurred during verification.');
        setStatus('error');
      }
    };

    verify();
  }, [searchParams, router, user, authLoading]);

  return (
    <div className="container py-12 md:py-20">
      <Card className="max-w-md mx-auto bg-gradient-to-br from-card to-card/80 border-border/50">
        <CardHeader className="text-center">
          {status === 'loading' && <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />}
          {status === 'success' && <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />}
          {status === 'error' && <AlertCircle className="h-12 w-12 text-destructive mx-auto" />}
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <div>
              <CardTitle>Verifying Payment...</CardTitle>
              <CardDescription>Please wait while we confirm your transaction.</CardDescription>
            </div>
          )}
          {status === 'success' && (
            <div>
              <CardTitle className="text-green-500">Upgrade Successful!</CardTitle>
              <CardDescription>Your account has been upgraded to PRO. You now have access to all premium features.</CardDescription>
              {apiKey && (
                  <div className="mt-4 text-left bg-secondary/50 p-4 rounded-lg">
                      <p className="text-sm font-bold">Your API Key:</p>
                      <p className="text-xs text-muted-foreground mb-2">Copy this key and save it. You will not see it again.</p>
                      <pre className="text-xs bg-background p-2 rounded-md font-mono break-all">{apiKey}</pre>
                  </div>
              )}
              <Button asChild className="mt-6">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          )}
          {status === 'error' && (
            <div>
              <CardTitle className="text-destructive">Verification Failed</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
               <Button asChild variant="secondary" className="mt-6">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <PaymentSuccessContent />
        </Suspense>
    )
}
