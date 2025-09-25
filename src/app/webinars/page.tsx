
import Link from "next/link";

export default function WebinarsPage() {
  return (
    <div className="container py-12 md:py-20 text-center">
      <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
        Webinars
      </h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Register for upcoming live sessions and watch on-demand content from our security experts. This section is coming soon.
      </p>
      <Link href="/" className="mt-8 inline-block text-primary hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  );
}
