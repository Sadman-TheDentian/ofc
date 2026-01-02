
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Gavel, Lock } from 'lucide-react';
import TechnicalIcon from "@/components/TechnicalIcon";
import CyberGrid from "@/components/CyberGrid";

export default function TermsOfServicePage() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 relative overflow-hidden">
      <CyberGrid />
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      <div className="container px-4 relative z-10">
        <div className="max-w-7xl mb-12 md:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-8 mb-8 md:mb-12">
              <TechnicalIcon icon={Gavel} glowColor="#00FF41" className="scale-75 origin-left" />
              <span className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase">OPERATIONAL_BOUNDARIES // LEGAL</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              SERVICE <br /><span className="text-white/10">CHARTER.</span>
            </h1>
            {lastUpdated && (
              <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-black italic font-mono bg-white/5 inline-block px-6 py-2 rounded-full border border-white/10">
                Last_Revision: {lastUpdated}
              </p>
            )}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-4 gap-24 items-start">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block space-y-8 sticky top-48 text-[9px] font-bold tracking-[0.4em] uppercase text-white/20">
            <div className="h-px w-12 bg-[#00FF41]/40 mb-12" />
            {[
              "1. Agreement",
              "2. Privacy",
              "3. Accounts",
              "4. Tool Usage",
              "5. IP Rights",
              "6. Transactions",
              "7. Prohibitions",
              "8. Termination",
              "9. Disclaimers",
              "10. Mission Control"
            ].map(item => (
              <div key={item} className="hover:text-white cursor-pointer transition-colors transition-all hover:translate-x-2">{item}</div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="prose prose-invert max-w-none prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-white prose-h2:mb-12 prose-h2:mt-24 first:mt-0 prose-p:text-white/40 prose-p:text-lg prose-p:font-light prose-p:leading-relaxed prose-strong:text-white prose-strong:font-bold prose-ul:text-white/40 prose-li:mb-4">
              <h2>1. Agreement to Terms</h2>
              <p>
                By using our website and any of our tools or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you
                don’t agree to be bound by these Terms, do not use the Services.
                If you are accessing and using the Services on behalf of a company
                (such as your employer) or other legal entity, you represent and
                warrant that you have the authority to bind that entity to these
                Terms.
              </p>

              <h2>2. Privacy Protocol</h2>
              <p>
                Please review our Privacy Protocol, which also governs your use of the
                Services, for information on how we collect, use and share your
                information.
              </p>

              <h2>3. User Accounts and Subscriptions</h2>
              <p>
                To access certain features, including our ELITE tools, you must create a validated identity account. You agree that the information you provide is accurate and complete. You are responsible for safeguarding your security keys.
              </p>

              <h2>4. Use of Our Tools</h2>
              <p>
                Our tools are provided for high-fidelity security assessment purposes only. You agree not to use our tools for any illegal, malicious, or unauthorized activities. This includes, but is not limited to, attempting to access accounts that are not your own or disrupting infrastructure. Any misuse of our services may result in an immediate and permanent protocol ban.
              </p>

              <h2>5. Intellectual Property</h2>
              <p>
                We and our licensors exclusively own all right, title and interest in and to the Services and Content,
                including all associated intellectual property rights. The platform architecture is protected by global copyright and trademark laws.
              </p>

              <h2>6. Payments and Refunds</h2>
              <p>
                All payments are processed through high-security third-party processors. By making a purchase, you agree to the terms of our payment gateway. Due to the nature of digital intelligence services, all sales are final and non-refundable.
              </p>

              <h2>7. General Prohibitions</h2>
              <p>You agree not to do any of the following:</p>
              <ul>
                <li>Infringe, misappropriate or violate a third party’s intellectual property rights.</li>
                <li>Use, display, mirror or frame the Services or any individual element within the Services.</li>
                <li>Attempt to probe, scan or test the vulnerability of any DentiSystems system outside of intended use.</li>
                <li>Interfere with, or attempt to interfere with, the access of any user, host or network.</li>
              </ul>

              <h2>8. Termination</h2>
              <p>
                We may terminate or suspend your access to and use of the Services, at our sole discretion, at any time and without notice to you, particularly if you violate these Terms.
              </p>

              <h2>9. Disclaimer of Warranties</h2>
              <p>
                THE SERVICES ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND. WE EXPLICITLY DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
              </p>

              <h2>10. Mission Control</h2>
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 md:p-14 mt-20 not-prose">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white tracking-[0.4em] uppercase">DIRECT_COMM_CHANNEL</span>
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">COMMAND_UNIT</h3>
                <div className="space-y-4 text-white/40 text-sm font-light leading-relaxed">
                  <p>DentiSystems Intelligence Unit</p>
                  <p>101 Kallang Ave, Singapore</p>
                  <p>Email: help@denti.systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
