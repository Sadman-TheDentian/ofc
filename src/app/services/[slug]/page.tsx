
import { services } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import * as LucideIcons from 'lucide-react';
import { Badge } from "@/components/ui/badge";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | DentiSystems`,
    description: service.description,
  };
}

// Dynamically render lucide icons from string
const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
    const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
    if (!LucideIcon) return null;
    return <LucideIcon {...props} />;
};

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "name": service.title,
    "description": service.longDescription,
    "provider": {
      "@type": "Organization",
      "name": "DentiSystems"
    },
    "image": service.imageUrl,
    "url": `https://www.denti.systems/services/${service.slug}`
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
              src={service.imageUrl} 
              alt={service.title} 
              fill
              className="object-cover w-full h-full opacity-10"
              data-ai-hint={service.imageHint}
              priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background" />
        </div>
        <div className="container relative z-10 text-center">
            <Badge className="mb-4 text-sm py-1 px-3">Our Services</Badge>
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
                {service.headline}
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                {service.description}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                    <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                    <Link href="/pricing">View Pricing</Link>
                </Button>
            </div>
        </div>
      </section>
      
      {/* The Challenge Section */}
      <section className="py-20 md:py-32 border-t border-border/50">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                {service.challenge.title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {service.challenge.description}
              </p>
            </div>
            {service.challenge.stat && (
              <div className="text-center lg:text-right">
                <p className="text-7xl lg:text-8xl font-bold text-primary">{service.challenge.stat}</p>
                <p className="text-lg text-muted-foreground">{service.challenge.statLabel}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="py-20 md:py-32 bg-card/50 backdrop-blur-sm border-y border-border/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Solution & Capabilities
            </h2>
            <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
              We provide a multi-faceted approach to address your security challenges head-on.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.capabilities.map((cap, index) => (
              <Card key={index} className="bg-gradient-to-br from-card to-card/80 border-border/50 text-center p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                <div className="mb-4 inline-block p-4 bg-secondary rounded-full">
                  <Icon name={cap.icon} className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-headline text-xl font-semibold mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm">{cap.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 md:py-32">
         <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                    Our Methodical Approach
                </h2>
                <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
                   Our process is transparent, structured, and designed for maximum impact and clear communication.
                </p>
            </div>
            <div className="relative max-w-5xl mx-auto">
                 <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/50 hidden md:block" />
                {service.approach.map((item, index) => (
                    <div key={item.step} className="relative flex md:items-center mb-12 group">
                        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-secondary border-2 border-primary/50 text-primary font-bold text-lg absolute left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                            {item.step}
                        </div>
                         <Card className={`w-full md:w-[calc(50%-3rem)] p-6 bg-gradient-to-br from-card to-card/80 border-border/50 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                            <h3 className="font-headline text-xl font-bold mb-2 text-primary">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </Card>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 md:py-32 bg-secondary/30 border-y border-border/50">
        <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-2xl font-medium italic text-foreground">
                    "{service.socialProof.quote}"
                </p>
                <p className="mt-6 font-semibold text-primary">{service.socialProof.author}</p>
                <p className="text-sm text-muted-foreground">{service.socialProof.company}</p>
            </div>
        </div>
      </section>

      {/* Final CTA Section */}
       <section className="py-20 md:py-32">
        <div className="container">
            <div className="max-w-3xl mx-auto text-center bg-card p-8 md:p-12 rounded-xl border border-primary/50 shadow-2xl shadow-primary/10">
                <h2 className="font-headline text-3xl font-bold mb-4">Ready to Fortify Your Defenses?</h2>
                <p className="text-muted-foreground mb-8">
                    Let's discuss how our {service.title} can be tailored to your organization's unique security needs.
                </p>
                <Button size="lg" asChild>
                    <Link href="/contact">Talk to an Expert</Link>
                </Button>
            </div>
        </div>
      </section>

    </div>
  );
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}
