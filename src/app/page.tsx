import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, ShieldCheck, Code } from "lucide-react";
import Link from "next/link";
import { services, tools, caseStudies } from "@/lib/data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-24 sm:py-32 md:py-40 bg-grid-green-500/[0.05]">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              DentiSystems
            </h1>
            <p className="font-headline text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl">
              Elite Cybersecurity & Custom Web Engineering
            </p>
            <p className="text-lg md:text-xl text-muted-foreground">
              High-risk vendor recon, breach monitoring, and secure web
              development that reduces operational risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Request Risk Audit</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/tools/darkcheck">Try DarkCheck</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Services
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              From penetrating the impenetrable to building resilient web
              platforms, we are your digital shield.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <service.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={`/services/${service.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="py-20 md:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Our Arsenal
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Cutting-edge tools to give you the upper hand in the digital
              battlefield.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {tools.slice(0, 3).map((tool) => (
              <Card key={tool.id} className="bg-background hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                  <tool.icon className="w-8 h-8 text-primary" />
                  <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                   <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={`/tools/${tool.slug}`}>
                      Explore Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="case-studies" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Success Stories
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
              See how we've helped organizations like yours mitigate risks and
              fortify their defenses.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((study) => (
              <Link href={`/case-studies`} key={study.id} className="group">
                <Card className="overflow-hidden h-full flex flex-col">
                  <Image
                    src={study.imageUrl}
                    alt={study.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    data-ai-hint={study.imageHint}
                  />
                  <CardHeader>
                    <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                      {study.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm">
                      {study.summary}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
