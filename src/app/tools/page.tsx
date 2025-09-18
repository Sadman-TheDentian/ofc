
import { tools } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ToolsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Our Arsenal
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Cutting-edge tools to give you the upper hand in the digital
          battlefield.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
           <Link href={`/tools/${tool.slug}`} key={tool.id} className="group">
            <Card className="flex flex-col h-full hover:border-primary/50 transition-colors overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50">
                <div className="relative h-48 w-full bg-secondary/30 flex items-center justify-center p-8">
                    <Image
                        src={tool.imageUrl}
                        alt={tool.title}
                        width={200}
                        height={100}
                        className="object-contain group-hover:scale-105 transition-transform"
                    />
                </div>
              <CardHeader className="flex flex-row items-center gap-4">
                 <div className="p-2 bg-secondary rounded-lg w-16 h-12 flex items-center justify-center shrink-0">
                    <Image src={tool.imageUrl} alt={tool.title} width={40} height={40} className="w-auto h-auto max-w-full max-h-full" />
                </div>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground flex-grow mb-4">
                  {tool.description}
                </p>
                <div className="self-start text-primary font-semibold flex items-center group-hover:underline">
                  Explore Tool <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
           </Link>
        ))}
      </div>
    </div>
  );
}

    