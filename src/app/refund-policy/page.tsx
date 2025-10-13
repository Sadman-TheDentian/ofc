
'use client';

import { useState, useEffect } from 'react';

export default function RefundPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Refund Policy
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
            Last updated: {lastUpdated}
            </p>
        </div>

        <div className="prose prose-invert max-w-none text-foreground/90 prose-h2:font-headline prose-h2:text-primary prose-a:text-primary prose-strong:text-foreground">
          <h2>1. Overview</h2>
          <p>
            Thank you for choosing DentiSystems. Our mission is to provide powerful and accessible security tools. This Refund Policy outlines our policy on refunds for our PRO plan subscription.
          </p>

          <h2>2. One-Time Payment for Digital Services</h2>
          <p>
            Our DentiSystems PRO plan is offered as a <strong>one-time payment for lifetime access</strong> to the PRO features available at the time of your purchase. This model is designed to be simple and transparent.
          </p>
          
          <h2>3. No Refunds</h2>
          <p>
            Due to the nature of our services being digital products and the use of cryptocurrency for transactions, which are irreversible, we have a strict <strong>no-refund policy</strong>.
          </p>
          <p>
            All sales are final. Once you have purchased the PRO plan and your payment is confirmed on the blockchain, you will have immediate and lifetime access to the features, and we are unable to offer a refund, exchange, or cancellation.
          </p>
          
           <h2>4. Why We Have This Policy</h2>
          <ul>
            <li>
              <strong>Irreversible Transactions:</strong> Cryptocurrency transactions are, by their nature, irreversible. Once a payment is sent and confirmed, it cannot be reversed.
            </li>
            <li>
             <strong>Immediate Access:</strong> You receive immediate access to the benefits and features of the PRO plan upon successful payment.
            </li>
             <li>
             <strong>Digital Product:</strong> Unlike physical goods, digital products cannot be "returned." Once access is granted, it cannot be revoked in a way that ensures the service is no longer used.
            </li>
          </ul>


          <h2>5. Exceptional Circumstances</h2>
          <p>
            We do not provide refunds, but we are committed to customer satisfaction. If you experience technical issues that prevent you from accessing or using the PRO features you purchased, please contact our support team. We will work with you to resolve the issue. Cases of non-delivery of service will be investigated on a case-by-case basis.
          </p>

           <h2>6. Contact Us</h2>
          <p>
            If you have questions about this Refund Policy or are experiencing technical difficulties with your PRO account, please
            contact us at:
          </p>
          <p>
            DentiSystems Inc. <br />
            Email: help@denti.systems
          </p>
        </div>
      </div>
    </div>
  );
}
