import type { LucideIcon } from 'lucide-react';
import type { Image as SanityImage } from 'sanity';

export type SanityImageSource = SanityImage;

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
  mainImage: SanityImageSource;
  content: any;
};

export type Author = {
    name?: string | null | undefined;
    image?: SanityImageSource | null | undefined;
};

export type BlogPost = {
    _id: string;
    slug: { current: string };
    title: string;
    excerpt: string;
    mainImage: SanityImageSource;
    publishedAt: string;
    author: Author;
    body: any;
};

export type Partner = {
  _id: string;
  name: string;
  website?: string;
  logo: SanityImageSource;
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
