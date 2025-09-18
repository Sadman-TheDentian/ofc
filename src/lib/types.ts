import type { LucideIcon } from "lucide-react";

export type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  imageUrl: string;
  imageHint: string;
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
  features: {
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
  slug: string;
  title: string;
  summary: string;
  industry: string;
  outcome: string;
  mainImage: any;
  content: any;
};

export type Author = {
    name: string;
    image: any;
};

export type BlogPost = {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    mainImage: any;
    publishedAt: string;
    author: Author;
    body: any;
};

export type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
};
