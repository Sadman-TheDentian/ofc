import { tools } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ToolDetailClient from "./ToolDetailClient";
import type { Tool } from "@/lib/types";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: `${tool.title} | DentiSystems`,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: Props) {
  const tool = tools.find((s) => s.slug === params.slug);

  if (!tool) {
    notFound();
  }

  const { icon, ...serializableTool } = tool;

  return <ToolDetailClient tool={serializableTool as Omit<Tool, 'icon'>} />;
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}
