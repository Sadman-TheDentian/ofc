
import { Shield, Eye, Database, Lock } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is our priority. We don't store or share any data. Everything runs in your browser.
          </p>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="cyber-card group hover:neon-glow transition-all duration-300">
            <Eye className="h-12 w-12 neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">No Tracking</h3>
            <p className="text-muted-foreground">
              We don't use cookies, analytics, or any tracking mechanisms that could compromise your privacy.
            </p>
          </div>

          <div className="cyber-card group hover:neon-glow transition-all duration-300">
            <Database className="h-12 w-12 neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">No Data Storage</h3>
            <p className="text-muted-foreground">
              Your emails and search queries are never stored on our servers or transmitted anywhere.
            </p>
          </div>

          <div className="cyber-card group hover:neon-glow transition-all duration-300">
            <Lock className="h-12 w-12 neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">Local Processing</h3>
            <p className="text-muted-foreground">
              All security checks happen locally in your browser for maximum privacy and security.
            </p>
          </div>

          <div className="cyber-card group hover:neon-glow transition-all duration-300">
            <Shield className="h-12 w-12 neon-text mb-4 group-hover:animate-pulse-neon" />
            <h3 className="text-xl font-semibold neon-text mb-3">Open Source</h3>
            <p className="text-muted-foreground">
              Our code is transparent and can be audited by security researchers worldwide.
            </p>
          </div>
        </div>

        {/* Detailed Policy */}
        <div className="space-y-8">
          <div className="cyber-card">
            <h2 className="text-2xl font-bold neon-text mb-4">Data Collection</h2>
            <p className="text-muted-foreground leading-relaxed">
              DentiSystems does not collect, store, or process any personal data. When you use DarkCheck to scan for data breaches, your email address is processed entirely within your browser and is never transmitted to our servers or any third-party services.
            </p>
          </div>

          <div className="cyber-card">
            <h2 className="text-2xl font-bold neon-text mb-4">How DarkCheck Works</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                Our breach detection technology works using locally stored breach databases and client-side processing:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Breach data is stored locally in your browser's memory during your session</li>
                <li>Your email is processed using cryptographic hashing techniques</li>
                <li>Comparisons are made locally without any network requests</li>
                <li>Results are generated instantly without any data leaving your device</li>
              </ul>
            </div>
          </div>

          <div className="cyber-card">
            <h2 className="text-2xl font-bold neon-text mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              DarkCheck operates independently and does not integrate with or share data with any third-party breach monitoring services. We maintain our own curated database of publicly disclosed breaches for reference purposes only.
            </p>
          </div>

          <div className="cyber-card">
            <h2 className="text-2xl font-bold neon-text mb-4">Website Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website does not use Google Analytics, Facebook Pixel, or any other tracking technologies. We don't use cookies for tracking purposes. Any temporary data stored in your browser is for functionality purposes only and is automatically cleared when you close your browser.
            </p>
          </div>

          <div className="cyber-card">
            <h2 className="text-2xl font-bold neon-text mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you contact us through our contact form or email, we only retain your message for the purpose of responding to your inquiry. We do not add you to any mailing lists or share your contact information with third parties.
            </p>
          </div>

          <div className="cyber-card">
            <h2 className="text-2xl font-bold neon-text mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any changes to this privacy policy will be clearly communicated on this page. Given our commitment to privacy-by-design, any future changes will only strengthen our privacy protections, never weaken them.
            </p>
          </div>

          <div className="cyber-card border-primary bg-primary/10">
            <h2 className="text-2xl font-bold neon-text mb-4">Our Commitment</h2>
            <p className="text-primary/90 leading-relaxed">
              DentiSystems is committed to building security tools that respect your privacy. We believe that protecting your data should not require you to sacrifice your privacy. This is our promise to you.
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-12 pt-8 border-t border-primary/20">
          <p className="text-muted-foreground">
            Last updated: December 12, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
