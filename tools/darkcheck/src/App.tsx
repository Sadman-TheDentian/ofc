
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import Home from "./pages/Home";
import Check from "./pages/Check";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import SecurityProtection from "./components/SecurityProtection";
import GlobalHeader from "./components/GlobalHeader";
import NeonFooter from "./components/NeonFooter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <SecurityProtection />
      <BrowserRouter basename="/tools/darkcheck">
          <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
            <GlobalHeader />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/check" element={<Check />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/result" element={<Result />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <NeonFooter />
          </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
