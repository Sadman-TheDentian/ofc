
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
            By using our website and any of our tools or services (collectively, the "Services"), you agree to be bound by these Terms. If you
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

          <h2>3. Changes to Terms or Services</h2>
          <p>
            We may update the Terms at any time, in our sole discretion. If we
            do so, we’ll let you know either by posting the updated Terms on the
            Site or through other communications. It’s important that you
            review the Terms whenever we update them or you use the Services.
          </p>

          <h2>4. Who May Use the Services?</h2>
          <p>
            You may use the Services only if you are 13 years or older and not
            barred from using the Services under applicable law. To make a
            purchase via the Services, you must be 18 years or older and capable
            of forming a binding contract.
          </p>
          
          <h2>5. Use of Our Tools</h2>
          <p>
            Our tools are provided for informational and security assessment purposes. You agree not to use our tools for any illegal or malicious activities. Any misuse of our services may result in a ban from our platform. We are not responsible for any damages caused by the use or misuse of our tools.
          </p>

          <h2>6. Content Ownership</h2>
          <p>
            We do not claim any ownership rights in any User Content and
            nothing in these Terms will be deemed to restrict any rights that
            you may have to use and exploit your User Content. Subject to the
            foregoing, DentiSystems and its licensors exclusively own all
            right, title and interest in and to the Services and Content,
            including all associated intellectual property rights.
          </p>

          <h2>7. General Prohibitions</h2>
          <p>You agree not to do any of the following:</p>
          <ul>
            <li>
              Post, upload, publish, submit or transmit any User Content that:
              (i) infringes, misappropriates or violates a third party’s
              patent, copyright, trademark, trade secret, moral rights or
              other intellectual property rights, or rights of publicity or
              privacy; (ii) violates, or encourages any conduct that would
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
              authentication measures, outside of the intended use of our security scanning tools.
            </li>
          </ul>

           <h2>8. Contact Information</h2>
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
