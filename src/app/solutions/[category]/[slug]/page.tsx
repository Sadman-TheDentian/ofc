
export default function SolutionPage({ params }: { params: { category: string, slug: string } }) {
  return (
    <div className="container py-12 md:py-20">
      <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        Solution: {params.slug.replace(/-/g, ' ')}
      </h1>
       <p className="text-lg text-muted-foreground">Category: {params.category.replace(/-/g, ' ')}</p>
      <p className="mt-4 text-xl text-muted-foreground">
        Detailed information about this solution will be available soon.
      </p>
    </div>
  );
}
