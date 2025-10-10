'use client';

import { Button } from '@/components/ui/button';
import { Dna } from 'lucide-react';
import { useEffect } from 'react';

function GlobalErrorClient({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="container min-h-screen flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center space-y-6 bg-secondary/30 p-8 rounded-xl border border-border">
                <Dna className="h-12 w-12 text-primary mx-auto" />
                <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
                    Something went wrong
                </h1>
                <p className="text-xl text-muted-foreground">
                    An unexpected error occurred. This might be a temporary issue with the application or a conflict with a browser extension (like MetaMask).
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={() => reset()} size="lg">
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
      </body>
    </html>
  );
}


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalErrorClient error={error} reset={reset} />;
}
