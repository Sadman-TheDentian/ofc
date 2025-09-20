
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          The DentiSystems Blog
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Insights on cybersecurity, web engineering, and the evolving threat landscape.
        </p>
      </div>
      
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Blog Posts Found</h3>
          <p className="text-muted-foreground mt-2">The Sanity.io integration has been temporarily disabled. Check back soon for updates.</p>
        </div>
    </div>
  );
}
