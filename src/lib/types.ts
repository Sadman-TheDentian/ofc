
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
  imageUrl: string;
  imageHint: string;
  features: {
    free: string[];
    pro: string[];
  };
  screenshots: {
    id: number,
    url: string;
    alt: string;
    hint: string;
  }[];
};

export type CaseStudy = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  industry: string;
  outcome: string;
  imageUrl: string;
  imageHint: string;
  content: string;
};

export type Author = {
    name: string;
    imageUrl: string;
    imageHint: string;
};

export type BlogPost = {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    imageHint: string;
    date: string;
    author: Author;
    content: string;
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
