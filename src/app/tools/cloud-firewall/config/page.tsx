
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ConfigContent from './ConfigContent';

export default function GeneratedConfigPage() {
  return (
    <Suspense fallback={
      <div className="container py-12 md:py-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading Configuration...</p>
        </div>
      </div>
    }>
      <ConfigContent />
    </Suspense>
  );
}
