import { services } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

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

  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <service.icon className="w-12 h-12 text-primary" />
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              {service.title}
            </h1>
          </div>
          <div className="prose prose-invert max-w-none text-foreground/80">
            <p className="text-xl text-muted-foreground">
              {service.description}
            </p>
            <p>{service.longDescription}</p>
          </div>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
        <aside className="space-y-6">
            <h3 className="font-headline text-xl font-semibold border-l-4 border-primary pl-4">Other Services</h3>
            <div className="space-y-4">
                {otherServices.map(other => (
                    <Link href={`/services/${other.slug}`} key={other.id} className="block">
                    <Card className="hover:border-primary/50 transition-colors bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline text-lg">
                                <other.icon className="w-5 h-5 text-primary" />
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
