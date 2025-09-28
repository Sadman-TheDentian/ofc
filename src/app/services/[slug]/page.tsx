
import { services } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter(s => s.slug !== params.slug);
  
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
    <div className="container py-12 md:py-20">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
        <div className="relative mb-12 overflow-hidden rounded-xl">
             <div className="relative h-64 md:h-96 w-full">
                <Image 
                    src={service.imageUrl} 
                    alt={service.title} 
                    fill
                    className="object-cover w-full h-full"
                    data-ai-hint={service.imageHint}
                    priority
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
             <div className="absolute bottom-0 left-0 p-8">
                <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                {service.title}
                </h1>
            </div>
        </div>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
            <div className="prose prose-invert max-w-none text-foreground/80 text-lg">
                 <p className="text-xl text-muted-foreground md:w-2/3">
                    {service.description}
                </p>
                <p>{service.longDescription}</p>
            </div>
            <Button asChild size="lg">
                <Link href="/contact">Get a Quote</Link>
            </Button>
        </div>
        <aside className="space-y-6">
            <h3 className="font-headline text-xl font-semibold border-l-4 border-primary pl-4">Other Services</h3>
            <div className="space-y-4">
                {otherServices.map(other => (
                    <Link href={`/services/${other.slug}`} key={other.id} className="block group">
                    <Card className="hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-card/80 border-border/50">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                                {other.title}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    </Link>
                ))}
            </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}
