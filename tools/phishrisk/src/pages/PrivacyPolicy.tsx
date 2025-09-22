
import GlobalHeader from "@/components/GlobalHeader";
import NeonFooter from "@/components/NeonFooter";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
    <GlobalHeader />
    <main className="flex-grow">
      <section className="max-w-xl mx-auto mt-14 mb-12 bg-card/80 neon-glow rounded-2xl p-8">
        <h1 className="text-2xl neon-text font-bold mb-3">Privacy Policy</h1>
        <p className="mb-4 text-muted-foreground">
          <b className="text-neon">PhishRisk Score</b> does <u>not</u> collect, store, or share any personal data—ever.
        </p>
        <ul className="list-disc ml-8 mb-3">
          <li>No logs or user IPs are saved.</li>
          <li>Scans operate in real-time; your data is never persisted.</li>
          <li>Results are generated instantly and cleared after your session.</li>
          <li>No analytics, no trackers.</li>
        </ul>
        <p className="text-muted-foreground">
          <span className="text-neon">Questions?</span> Contact <a href="mailto:contact@denti.systems" className="underline">DentiSystems support</a>.
        </p>
      </section>
    </main>
    <NeonFooter />
  </div>
);

export default PrivacyPolicy;
