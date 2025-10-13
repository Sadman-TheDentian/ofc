
export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>

        <div className="prose prose-invert max-w-none text-foreground/90 prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
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
            register with the Site, purchase a PRO plan, or when you choose to participate in various
            activities related to the Site, such as using our tools.
          </p>
          <p>
            <strong>Derivative Data:</strong> Information our servers
            automatically collect when you access the Site, such as your IP
            address, your browser type, your operating system, and your access
            times. This data is used for security and operational purposes and is not linked to your personal account in a way that tracks your activity for marketing purposes.
          </p>
           <p>
            <strong>Financial Data:</strong> We use third-party payment processors (e.g., Coinbase Commerce) to handle payments. All financial information is stored and processed by our payment processors. We do not store any of your financial information on our servers.
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
            <li>Create and manage your account.</li>
            <li>
              Email you regarding your account or order.
            </li>
            <li>
              Fulfill and manage purchases, orders, payments, and other transactions related to the Services.
            </li>
            <li>
              Monitor and analyze usage and trends to improve your experience with
              the Services.
            </li>
             <li>
              Notify you of updates to the Services.
            </li>
             <li>
              Provide you with customer support and respond to your inquiries.
            </li>
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

            policies, or to protect the rights, property, and safety of others,
            we may share your information as permitted or required by any
            applicable law, rule, or regulation.
          </p>
          <p>
            <strong>Third-Party Service Providers:</strong> We may share your
            information with third parties that perform services for us or on
            our behalf, including payment processing (Coinbase Commerce), cloud hosting (Google Cloud), and email
            delivery.
          </p>
          <p>
            <strong>Third-Party Advertisers:</strong> We do not share your personal information with any third-party advertisers.
          </p>

          <h2>5. Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. This includes using secure servers, firewalls, and encryption. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>

           <h2>6. Your Data Rights</h2>
          <p>You have the right to review or remove your account information at any time. You can do this by logging into your account settings or by contacting us directly.</p>

           <h2>7. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at:
          </p>
          <p>
            DentiSystems Inc. <br />
            One World Trade Center <br />
            New York, NY 10007, USA <br />
            Email: privacy@denti.systems
          </p>
        </div>
      </div>
    </div>
  );
}
