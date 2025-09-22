
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/auth';
import { Loader2, ShieldOff } from 'lucide-react';
import GlobalHeader from './components/GlobalHeader';
import NeonFooter from './components/NeonFooter';

const queryClient = new QueryClient();

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
        <GlobalHeader />
        <main className="flex-grow flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-400">Verifying authentication...</p>
        </main>
        <NeonFooter />
      </div>
    );
  }

  if (!user) {
    return (
       <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
        <GlobalHeader/>
        <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <ShieldOff className="h-16 w-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-red-400 mb-4">Access Denied</h1>
        <p className="text-gray-300 max-w-md mb-8">
          You must be logged in to use LeakScan. Please sign in or create an account on our main website to access this tool.
        </p>
        <a href="https://dentisystems.com/auth" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold">
          Login on DentiSystems
        </a>
        </main>
        <NeonFooter />
      </div>
    );
  }

  return <>{children}</>;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthGuard>
        <BrowserRouter basename="/tools/leakscan">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </AuthGuard>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
