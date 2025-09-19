
import { tools } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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

  const screenshots = tool.screenshots && tool.screenshots.length > 0 ? tool.screenshots : [{
    id: 1,
    url: tool.imageUrl,
    alt: tool.title,
    hint: tool.title,
  }];

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-block p-4 bg-secondary rounded-xl">
            <Image src={tool.imageUrl} alt={tool.title} width={48} height={48} />
          </div>
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            {tool.title}
          </h1>
          <p className="text-xl text-muted-foreground">{tool.longDescription}</p>
        </div>
        
        <div className="mb-16">
          <Carousel className="w-full">
            <CarouselContent>
              {screenshots.map((screenshot) => (
                <CarouselItem key={screenshot.id}>
                  <Card className="overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80">
                    <CardContent className="p-0 aspect-video relative">
                      <Image 
                        src={screenshot.url} 
                        alt={screenshot.alt} 
                        fill 
                        objectFit="cover" 
                        className="w-full h-auto" 
                        data-ai-hint={screenshot.hint}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {screenshots.length > 1 && (
                <>
                    <CarouselPrevious className="left-[-50px]" />
                    <CarouselNext className="right-[-50px]" />
                </>
            )}
          </Carousel>
        </div>

        {tool.url && (
            <div className="text-center bg-secondary/50 p-8 rounded-xl">
            <h2 className="font-headline text-2xl font-bold text-center mb-4">
                Launch {tool.title}
            </h2>
            <p className="text-muted-foreground mb-6">
                Click the button below to access the tool.
            </p>
            <Button size="lg" asChild>
                <Link href={tool.url} target="_blank" rel="noopener noreferrer">Launch Tool</Link>
            </Button>
            </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
