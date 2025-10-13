
export default function TermsOfServicePage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Terms of Service
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>

        <div className="prose prose-invert max-w-none text-foreground/90 prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
          <h2>1. Agreement to Terms</h2>
          <p>
            By using our website and any of our tools or services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you
            don’t agree to be bound by these Terms, do not use the Services.
            If you are accessing and using the Services on behalf of a company
            (such as your employer) or other legal entity, you represent and
            warrant that you have the authority to bind that entity to these
            Terms. In that case, “you” and “your” will refer to that entity.
          </p>

          <h2>2. Privacy Policy</h2>
          <p>
            Please review our Privacy Policy, which also governs your use of the
            Services, for information on how we collect, use and share your
            information.
          </p>

          <h2>3. User Accounts and Subscriptions</h2>
            <p>
                To access certain features, including our PRO tools, you must create an account. You agree that the information you provide is accurate and complete. You are responsible for safeguarding your password. Our PRO plan is a one-time purchase for lifetime access to the features available at the time of purchase.
            </p>

          <h2>4. Use of Our Tools</h2>
          <p>
            Our tools are provided for informational and lawful security assessment purposes only. You agree not to use our tools for any illegal, malicious, or unauthorized activities. This includes, but is not limited to, attempting to access accounts that are not your own, attacking or disrupting systems, or any other activity that violates applicable laws. Any misuse of our services may result in an immediate and permanent ban from our platform. We are not responsible for any damages caused by the use or misuse of our tools.
          </p>

           <h2>5. Intellectual Property</h2>
          <p>
            We and our licensors exclusively own all right, title and interest in and to the Services and Content,
            including all associated intellectual property rights. You acknowledge that the Services and Content are protected by copyright, trademark, and other laws of the United States and foreign countries.
          </p>

          <h2>6. Payments and Refunds</h2>
            <p>
                All payments for our PRO plan are processed through third-party payment processors (e.g., Coinbase Commerce). By making a purchase, you agree to the terms of our payment processor. Due to the nature of digital services and cryptocurrency transactions, all sales are final and non-refundable. Please see our <a href="/refund-policy">Refund Policy</a> for more details.
            </p>

          <h2>7. General Prohibitions</h2>
          <p>You agree not to do any of the following:</p>
          <ul>
            <li>
              Post, upload, publish, submit or transmit any content that:
              (i) infringes, misappropriates or violates a third party’s
              patent, copyright, trademark, trade secret, or
              other intellectual property rights; (ii) violates, or encourages any conduct that would
              violate, any applicable law or regulation or would give rise to
              civil liability.
            </li>
            <li>
              Use, display, mirror or frame the Services or any individual
              element within the Services, DentiSystems’ name, any DentiSystems
              trademark, logo or other proprietary information, or the layout
              and design of any page or form contained on a page, without
              DentiSystems’ express written consent.
            </li>
            <li>
              Attempt to probe, scan or test the vulnerability of any
              DentiSystems system or network or breach any security or
              authentication measures, outside of the intended and lawful use of our security scanning tools.
            </li>
             <li>
              Interfere with, or attempt to interfere with, the access of any user, host or network, including, without limitation, sending a virus, overloading, flooding, spamming, or mail-bombing the Services.
            </li>
          </ul>

           <h2>8. Termination</h2>
            <p>
                We may terminate or suspend your access to and use of the Services, at our sole discretion, at any time and without notice to you, particularly if you violate these Terms.
            </p>

           <h2>9. Disclaimer of Warranties</h2>
            <p>
                THE SERVICES ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND. WE EXPLICITLY DISCLAIM ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
            </p>

           <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms or the Services, please
            contact us at:
          </p>
          <p>
            DentiSystems Inc. <br />
            One World Trade Center <br />
            New York, NY 10007, USA <br />
            Email: help@denti.systems
          </p>
        </div>
      </div>
    </div>
  );
}
