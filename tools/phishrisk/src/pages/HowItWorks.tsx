
import GlobalHeader from "@/components/GlobalHeader";
import NeonFooter from "@/components/NeonFooter";

const HowItWorks = () => (
    <section className="max-w-2xl mx-auto mt-10 mb-12 bg-card/80 neon-glow rounded-2xl p-8">
      <h1 className="text-3xl neon-text font-bold mb-4">How Phishing Risk is Calculated</h1>
      <div className="space-y-6 text-lg">
        <div className="bg-cyber-bg/70 rounded-lg p-4 border-l-4 border-neon mb-2">
          <b className="neon-text">Breach Database Check</b><br/>
          Email or domain checked against recent breach data dumps (simulated here). The more breach hits, the higher the risk.
        </div>
        <div className="bg-cyber-bg/70 rounded-lg p-4 border-l-4 border-neon mb-2">
          <b className="neon-text">DNS Security Records</b><br/>
          Checks for SPF, DKIM, DMARC on domain: missing any increases risk.
        </div>
        <div className="bg-cyber-bg/70 rounded-lg p-4 border-l-4 border-neon mb-2">
          <b className="neon-text">MX Configuration & Scam Listings</b><br/>
          Identifies misconfigured mail servers and domain mentions in ScamDBs.
        </div>
        <div className="bg-cyber-bg/70 rounded-lg p-4 border-l-4 border-neon">
          <b className="neon-text">Score Calculation</b><br/>
          Risk score is 0–100, weighted by severity and number of risk factors.
        </div>
      </div>
      <div className="mt-7 text-muted-foreground italic text-sm">
        * Real-time scans. No user data stored.
      </div>
    </section>
);
export default HowItWorks;
