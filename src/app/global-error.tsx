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
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white antialiased overflow-hidden">
        <div className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center">
          {/* Background HUD Grid */}
          <div className="absolute inset-0 z-0 opacity-[0.05]" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }} />

          <div className="relative z-10 max-w-2xl px-4">
            <div className="h-24 w-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
              <ShieldAlert className="h-10 w-10 text-red-500 animate-pulse" />
            </div>

            <div className="space-y-6 mb-12">
              <span className="text-[10px] font-bold tracking-[1.2rem] text-red-500 uppercase ml-[1.2rem]">SHIELD_FAILURE</span>
              <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                SYSTEM <span className="text-white/20">FRAGMENTED.</span>
              </h1>
              <p className="text-white/30 text-lg font-light italic leading-relaxed">
                A critical exception has decoupled the interface from the logic substrate. Initiating emergency recovery protocols.
              </p>
            </div>

            {error.digest && (
              <div className="mb-12 p-4 bg-white/[0.02] border border-white/5 rounded-2xl font-mono text-[9px] text-white/20 uppercase tracking-widest">
                ERROR_ID: {error.digest}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => reset()}
                size="lg"
                className="h-16 px-12 rounded-full bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#00FF41] transition-all"
              >
                REBOOT_CONNECTION
              </Button>
              <Button
                variant="outline"
                className="h-16 px-12 rounded-full border-white/10 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all"
                asChild
              >
                <a href="/contact">SUPPORT_CHANNEL</a>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 text-center opacity-10">
            <span className="text-[9px] font-bold tracking-[1em] text-white uppercase">EMERGENCY_ARCHIVE // V7.4</span>
          </div>
        </div>
      </body>
    </html>
  );
}

// Missing import fix
import { ShieldAlert } from 'lucide-react';


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalErrorClient error={error} reset={reset} />;
}
