
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText } from 'lucide-react';
import TechnicalIcon from "@/components/TechnicalIcon";

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-40 pb-20 relative overflow-hidden">
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
              <TechnicalIcon icon={Shield} glowColor="#00FF41" className="scale-75 origin-left" />
              <span className="text-[10px] font-black tracking-[1.2em] text-[#00FF41] uppercase">DATA_PROTECTION // GOVERNANCE</span>
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-[160px] font-[900] tracking-[-0.05em] text-white uppercase italic leading-[0.7] mb-12 md:mb-16">
              PRIVACY <br /><span className="text-white/10">PROTOCOL.</span>
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
              "1. Introduction",
              "2. Collection",
              "3. Utilization",
              "4. Disclosure",
              "5. Security",
              "6. Rights",
              "7. Transmission"
            ].map(item => (
              <div key={item} className="hover:text-white cursor-pointer transition-colors transition-all hover:translate-x-2">{item}</div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="prose prose-invert max-w-none prose-h2:text-4xl prose-h2:font-black prose-h2:italic prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-white prose-h2:mb-12 prose-h2:mt-24 first:mt-0 prose-p:text-white/40 prose-p:text-lg prose-p:font-light prose-p:leading-relaxed prose-strong:text-white prose-strong:font-bold prose-ul:text-white/40 prose-li:mb-4">
              <h2>1. Introduction</h2>
              <p>
                DentiSystems ("we," "our," or "us") is committed to protecting your
                privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website
                and use our services, including our security tools (collectively, the "Services"). Please read this privacy policy
                carefully. If you do not agree with the terms of this privacy policy,
                do not access the site or use our Services.
              </p>

              <h2>2. Collection of Your Information</h2>
              <p>
                We may collect information about you in a variety of ways. The
                information we may collect on the Site includes:
              </p>
              <p>
                <strong>Personal Data:</strong> Personally identifiable information,
                such as your name, email address, and payment information that you voluntarily give to us when you
                register with the Site, purchase a plan, or when you choose to participate in various
                activities related to the Site, such as using our tools.
              </p>
              <p>
                <strong>Derivative Data:</strong> Information our servers
                automatically collect when you access the Site, such as your IP
                address, your browser type, your operating system, and your access
                times. This data is used for security and operational purposes and is not linked to your personal account in a way that tracks your activity for marketing purposes.
              </p>
              <p>
                <strong>Financial Data:</strong> We use third-party payment processors to handle payments. All financial information is stored and processed by our payment processors. We do not store any of your financial information on our servers.
              </p>
              <p>
                <strong>Tool Usage Data:</strong> For security and improvement purposes, we may log anonymized query data for our tools. For example, when using our AI Code Scanners, the code snippet you provide is sent to our AI service for analysis but is not stored or linked to your account.
              </p>

              <h2>3. Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you
                with a smooth, efficient, and customized experience. Specifically,
                we may use information collected about you via the Site to:
              </p>
              <ul>
                <li>Create and manage your account securely.</li>
                <li>Transmit mission-critical updates regarding your account.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Services.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Services.</li>
                <li>Notify you of updates to the Services.</li>
                <li>Provide you with high-fidelity customer support and respond to your inquiries.</li>
              </ul>

              <h2>4. Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain
                situations. Your information may be disclosed as follows:
              </p>
              <p>
                <strong>By Law or to Protect Rights:</strong> If we believe the
                release of information about you is necessary to respond to legal
                process, to investigate or remedy potential violations of our
                policies, or to protect the rights, property, and safety of others.
              </p>
              <p>
                <strong>Third-Party Service Providers:</strong> We may share your
                information with third parties that perform services for us or on
                our behalf, including payment processing, cloud hosting, and email
                delivery.
              </p>

              <h2>5. Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to
                help protect your personal information. This includes using secure servers, firewalls, and encryption. While we have taken
                reasonable steps to secure the personal information you provide to
                us, please be aware that despite our efforts, no security measures
                are perfect or impenetrable.
              </p>

              <h2>6. Your Data Rights</h2>
              <p>You have the right to review or remove your account information at any time. You can do this by logging into your account settings or by contacting our intelligence unit directly.</p>

              <h2>7. Contact Information</h2>
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 md:p-14 mt-20 not-prose">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-2 w-2 bg-[#00FF41] rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-white tracking-[0.4em] uppercase">DIRECT_COMM_CHANNEL</span>
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-8">LEGAL_UNIT</h3>
                <div className="space-y-4 text-white/40 text-sm font-light leading-relaxed">
                  <p>DentiSystems Intelligence Unit</p>
                  <p>101 Kallang Ave, Singapore</p>
                  <p>Email: privacy@denti.systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
