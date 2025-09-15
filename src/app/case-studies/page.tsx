"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { caseStudies as allCaseStudies } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const industries = [
  "All",
  ...Array.from(new Set(allCaseStudies.map((cs) => cs.industry))),
];
const outcomes = [
  "All",
  ...Array.from(new Set(allCaseStudies.map((cs) => cs.outcome))),
];

export default function CaseStudiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [outcomeFilter, setOutcomeFilter] = useState("All");

  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter((study) => {
      const matchesSearch =
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry =
        industryFilter === "All" || study.industry === industryFilter;
      const matchesOutcome =
        outcomeFilter === "All" || study.outcome === outcomeFilter;

      return matchesSearch && matchesIndustry && matchesOutcome;
    });
  }, [searchTerm, industryFilter, outcomeFilter]);

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center space-y-4 mb-12">
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl animate-fade-in-up">
          Case Studies
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Explore our successful partnerships and discover how we solve complex
          security challenges.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 border border-border rounded-lg bg-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search stories..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:flex-grow-0">
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by Outcome" />
            </SelectTrigger>
            <SelectContent>
              {outcomes.map((outcome) => (
                <SelectItem key={outcome} value={outcome}>
                  {outcome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredCaseStudies.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCaseStudies.map((study, index) => (
            <Link href="#" key={study.id} className="group">
              <Card className="overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors animate-fade-in-up" style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
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
        <div className="text-center py-16 border border-dashed rounded-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-headline text-xl font-semibold">No Results Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
