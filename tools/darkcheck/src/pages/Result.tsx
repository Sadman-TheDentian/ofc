
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { checkEmailForBreaches, BreachResult } from '@/lib/breachCheck';
import { obfuscateEmail } from '@/lib/utils';
import ResultCard from '@/components/ResultCard';
import ShareResult from '@/components/ShareResult';

const Result = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<BreachResult | null>(null);

  useEffect(() => {
    const encodedEmail = searchParams.get('q');
    if (encodedEmail) {
      try {
        const decodedEmail = atob(encodedEmail);
        if (decodedEmail && decodedEmail.includes('@')) {
          setEmail(decodedEmail);
        } else {
          setError('Invalid email format in link.');
          setIsLoading(false);
        }
      } catch (e) {
        setError('Invalid or corrupted share link.');
        setIsLoading(false);
      }
    } else {
      setError('No email provided in share link.');
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    const runCheck = async () => {
      if (email) {
        setIsLoading(true);
        const breachResult = await checkEmailForBreaches(email);
        setResult(breachResult);
        setIsLoading(false);
      }
    };
    runCheck();
  }, [email]);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Checking breach status for {email ? obfuscateEmail(email) : 'email'}...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8">
          <p className="text-destructive">{error}</p>
        </div>
      );
    }

    if (result && email) {
      return (
        <div>
          <div className="text-center mb-4 pt-6">
            <h2 className="text-2xl font-bold neon-text">Breach Result</h2>
            <p className="text-muted-foreground">Showing result for: {obfuscateEmail(email)}</p>
          </div>
          <ResultCard result={result} />
          <ShareResult email={email} />
        </div>
      );
    }
    
    return null;
  };


  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="cyber-card">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Result;
