
import SolutionDetailClient from "./SolutionDetailClient";

export default function SolutionPage({ params }: { params: { category: string, slug: string } }) {
  return <SolutionDetailClient category={params.category} slug={params.slug} />;
}

export async function generateStaticParams() {
  const solutions = {
    "vertical-markets": ["financial-services", "healthcare", "government", "retail"],
    "operational-use-cases": ["zero-trust-architecture", "compliance", "threat-intelligence"]
  };

  const params = [];
  for (const [category, slugs] of Object.entries(solutions)) {
    for (const slug of slugs) {
      params.push({ category, slug });
    }
  }
  return params;
}
