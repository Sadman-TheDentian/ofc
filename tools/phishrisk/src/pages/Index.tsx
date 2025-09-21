import NeonHeader from "@/components/NeonHeader";
import NeonFooter from "@/components/NeonFooter";
import ScanForm from "@/components/ScanForm";

const Index = () => (
  <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
    <NeonHeader />
    <main className="flex-grow flex flex-col items-center justify-center select-none">
      <section className="text-center my-8 animate-fade-in px-4">
        <h1 className="text-5xl font-bold leading-tight text-white mb-3">PhishRisk Score</h1>
        <p className="text-xl text-muted-foreground font-mono mb-7 max-w-2xl mx-auto">Is your email or company domain a likely target for phishing? Scan in seconds. No data stored.</p>
        <ScanForm />
      </section>
    </main>
    <NeonFooter />
  </div>
);

export default Index;
