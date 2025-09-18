
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import type { CaseStudy } from "@/lib/types";

export default function CaseStudiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCaseStudies, setAllCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const query = `*[_type == "caseStudy"]{
        _id,
        title,
        "slug": slug.current,
        summary,
        industry,
        outcome,
        mainImage
      }`;
      const studies: CaseStudy[] = await client.fetch(query);
      setAllCaseStudies(studies);
      setFilteredCaseStudies(studies);
    };
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    const results = allCaseStudies.filter((study) =>
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCaseStudies(results);
  }, [searchTerm, allCaseStudies]);

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/50">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
          Case Studies
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Explore our successful partnerships and discover how we solve complex
          security challenges.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 border border-border rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search stories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredCaseStudies.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCaseStudies.map((study) => (
            <Link href="#" key={study._id} className="group">
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
                {study.mainImage && (
                    <div className="relative w-full h-48 object-cover group-hover:scale-105 transition-transform">
                        <Image
                            src={urlFor(study.mainImage).url()}
                            alt={study.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground text-sm mb-4">
                    {study.summary}
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{study.industry}</span>
                    <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{study.outcome}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <h3 className="font-headline text-xl font-semibold">No Results Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
