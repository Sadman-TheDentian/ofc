
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="container py-12 md:py-20 text-center">
      <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        Documentation
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Our comprehensive developer documentation portal is coming soon.
      </p>
      <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  );
}
