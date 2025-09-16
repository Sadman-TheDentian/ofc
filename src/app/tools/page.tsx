
import { tools } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12">
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
            <Card className="flex flex-col h-full hover:border-primary/50 transition-colors bg-gradient-to-br from-card to-card/80">
              <CardHeader className="flex flex-row items-center gap-4">
                <tool.icon className="w-10 h-10 text-primary" />
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
