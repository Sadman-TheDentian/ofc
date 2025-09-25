
export default function PartnerPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container py-12 md:py-20">
      <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        Partner Program: {params.slug.replace(/-/g, ' ')}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Detailed information about our partner programs will be available soon.
      </p>
    </div>
  );
}
