
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const solutions = {
  "By Industry": [
    { name: "Financial Services", slug: "financial-services", description: "Secure banking platforms, trading applications, and customer data with our specialized fintech security solutions." },
    { name: "Healthcare", slug: "healthcare", description: "Ensure HIPAA compliance and protect sensitive patient data with resilient security for EMR systems and telehealth platforms." },
    { name: "Government", slug: "government", description: "Fortify public sector infrastructure against nation-state threats with our hardened security and compliance frameworks." },
    { name: "Retail", slug: "retail", description: "Protect e-commerce platforms and customer payment information from breaches and fraud with PCI-DSS compliant solutions." }
  ],
  "By Use Case": [
    { name: "Zero Trust Architecture", slug: "zero-trust-architecture", description: "Implement a modern security model that verifies every user and device, drastically reducing the attack surface." },
    { name: "Compliance Automation", slug: "compliance", description: "Streamline adherence to regulations like GDPR, HIPAA, and PCI-DSS with our automated compliance and reporting tools." },
    { name: "Threat Intelligence", slug: "threat-intelligence", description: "Integrate real-time threat feeds and proactive threat hunting into your security operations for an attacker's advantage." }
  ]
};

export default function SolutionsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Tailored Security Solutions
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Discover how DentiSystems addresses the unique security challenges of your industry and specific use cases.
        </p>
      </div>

      {Object.entries(solutions).map(([category, items]) => (
        <div key={category} className="mb-16">
          <h2 className="font-headline text-2xl font-bold tracking-tighter mb-8 border-l-4 border-primary pl-4">
            {category}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <Link 
                href={`/solutions/${category.toLowerCase().replace(/\\s+/g, '-')}/${item.slug}`} 
                key={item.slug}
                className="group"
              >
                <Card className="h-full flex flex-col hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card to-card/80 border-border/50 hover:shadow-2xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
                    <div className="self-start text-primary font-semibold flex items-center group-hover:underline">
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
