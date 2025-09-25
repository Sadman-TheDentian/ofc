
import GlobalHeader from "@/components/GlobalHeader";
import NeonFooter from "@/components/NeonFooter";
import ScanForm from "@/components/ScanForm";

const Index = () => (
    <section className="text-center my-8 animate-fade-in px-4">
      <h1 className="text-5xl font-bold leading-tight text-white mb-3">PhishRisk Score</h1>
      <p className="text-xl text-muted-foreground font-mono mb-7 max-w-2xl mx-auto">Is your email or company domain a likely target for phishing? Scan in seconds. No data stored.</p>
      <ScanForm />
    </section>
);

export default Index;
