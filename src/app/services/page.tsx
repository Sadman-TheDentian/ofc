import { services } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Our Services
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          A suite of services designed to provide 360-degree cybersecurity
          coverage for modern enterprises.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
           <Link href={`/services/${service.slug}`} key={service.id} className="group">
            <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 border-border/50">
              <div className="relative h-48 w-full">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={service.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground flex-grow mb-4">
                  {service.description}
                </p>
                <div className="self-start text-primary font-semibold flex items-center group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
