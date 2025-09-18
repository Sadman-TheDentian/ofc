
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import type { CaseStudy } from "@/lib/types";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { slug: string };
};

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const query = `*[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    industry,
    outcome,
    mainImage,
    content
  }`;
  const study = await client.fetch(query, { slug });
  return study;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = await getCaseStudy(params.slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} | DentiSystems Case Studies`,
    description: study.summary,
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="relative my-6">
        <Image 
          src={urlFor(value).url()} 
          alt={value.alt || 'Case study image'} 
          width={800} 
          height={600}
          className="rounded-lg shadow-lg"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold font-headline mt-8 mb-4 text-primary">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold font-headline mt-6 mb-4 text-primary/90">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 my-6">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 my-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </a>
      )
    },
  },
};

export default async function CaseStudyPage({ params }: Props) {
  const study = await getCaseStudy(params.slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="mb-8">
        <Link href="/case-studies" className="flex items-center text-primary hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all case studies
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl mb-4">
            {study.title}
          </h1>
          <div className="flex justify-center gap-2">
            {study.industry && <Badge variant="secondary">{study.industry}</Badge>}
            {study.outcome && <Badge variant="secondary">{study.outcome}</Badge>}
          </div>
        </div>

        {study.mainImage && (
          <div className="mb-12 relative aspect-video">
            <Image
              src={urlFor(study.mainImage).url()}
              alt={study.title}
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        )}
        
        {study.content && (
            <div className="prose prose-invert max-w-none text-foreground/90">
                <PortableText value={study.content} components={portableTextComponents} />
            </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const studies = await client.fetch<CaseStudy[]>(`*[_type == "caseStudy"]{"slug": slug.current}`);
  return studies.map((study) => ({
    slug: study.slug,
  }));
}
