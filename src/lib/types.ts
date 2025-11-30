import type { LucideIcon } from 'lucide-react';
import type { SVGProps } from 'react';
import { PortableTextBlock } from 'sanity';

// Define a base type for Sanity images
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export type Service = {
  id: number;
  slug: string;
  title: string;
  headline: string;
  description: string;
  longDescription: string;
  icon: string;
  imageUrl: string;
  imageHint: string;
  challenge: {
    title: string;
    description: string;
    stat?: string;
    statLabel?: string;
  };
  capabilities: {
    icon: string;
    title: string;
    description: string;
  }[];
  approach: {
    step: number;
    title: string;
    description: string;
  }[];
  socialProof: {
    quote: string;
    author: string;
    company: string;
  };
};

export type Tool = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  url?: string;
  imageUrl: string;
  embedCode?: string;
  features?: {
    free: string[];
    pro: string[];
  };
  screenshots?: {
    id: number,
    url: string;
    alt: string;
    hint: string;
  }[];
};

export type CaseStudy = {
  _id: string;
  slug: { current: string };
  title: string;
  summary: string;
  industry: string;
  outcome: string;
  mainImage?: SanityImage | string; 
  content: PortableTextBlock[];
};

export type Author = {
    name?: string | null;
    image?: SanityImage | string;
};

export type BlogPost = {
    _id: string;
    slug: { current: string };
    title: string;
    excerpt: string;
    mainImage?: SanityImage | string;
    publishedAt: string;
    author?: Author;
    body: PortableTextBlock[];
};

export type NewsArticle = {
    _id: string;
    _updatedAt: string;
    slug: { current: string };
    title: string;
    excerpt: string;
    mainImage?: SanityImage | string;
    publishedAt: string;
    author?: Author;
    body: PortableTextBlock[];
}

export type ThreatReport = {
    _id: string;
    slug: { current: string };
    title: string;
    publishedAt: string;
    mainImage?: SanityImage | string;
    summary: PortableTextBlock[];
    fileURL?: any;
}

export type WhitePaper = {
    _id: string;
    slug: { current: string };
    title: string;
    publishedAt: string;
    mainImage?: SanityImage | string;
    summary: PortableTextBlock[];
    fileURL?: any;
}

export type Partner = {
  id: string;
  name: string;
  logo: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  website?: string;
}

export type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
};
