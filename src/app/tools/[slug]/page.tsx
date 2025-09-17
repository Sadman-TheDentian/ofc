
import { tools } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Minus } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.title} | DentiSystems`,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: Props) {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const allFeatures = Array.from(
    new Set([...tool.features.free, ...tool.features.pro])
  );

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block p-4 bg-secondary rounded-xl">
            <tool.icon className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {tool.title}
          </h1>
          <p className="text-xl text-muted-foreground">{tool.longDescription}</p>
        </div>
        
        {tool.embedCode ? (
          <div className="mb-16">
            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-0 aspect-video relative">
                 <div className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" dangerouslySetInnerHTML={{ __html: tool.embedCode }} />
              </CardContent>
            </Card>
          </div>
        ) : tool.screenshots && tool.screenshots.length > 0 && (
            <Carousel className="w-full max-w-3xl mx-auto mb-16">
            <CarouselContent>
                {tool.screenshots.map((ss) => (
                <CarouselItem key={ss.id}>
                    <Card className="overflow-hidden border-border/50">
                        <CardContent className="p-0 aspect-[3/2] relative">
                            <Image src={ss.url} alt={ss.alt} layout="fill" objectFit="cover" className="w-full h-auto" data-ai-hint={ss.hint} />
                        </CardContent>
                    </Card>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
        )}


        <div className="mb-16">
          <h2 className="font-headline text-2xl font-bold text-center mb-8">
            Free vs. PRO
          </h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60%]">Feature</TableHead>
                  <TableHead className="text-center">Free</TableHead>
                  <TableHead className="text-center text-primary font-bold">
                    PRO
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allFeatures.map((feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium">{feature}</TableCell>
                    <TableCell className="text-center">
                      {tool.features.free.includes(feature) ? (
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      ) : (
                        <Minus className="h-5 w-5 mx-auto text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {tool.features.pro.includes(feature) ? (
                        <Check className="h-5 w-5 mx-auto text-primary" />
                      ) : (
                        <Minus className="h-5 w-5 mx-auto text-muted-foreground" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="text-center bg-secondary/50 p-8 rounded-xl">
          <h2 className="font-headline text-2xl font-bold text-center mb-4">
            Ready to Upgrade?
          </h2>
          <p className="text-muted-foreground mb-6">
            Unlock the full potential of {tool.title} with a PRO subscription.
          </p>
          <Button size="lg" asChild>
            <Link href="/pricing">View Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
